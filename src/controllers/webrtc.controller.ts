import firebase from '../firebase';

const db = firebase.firestore();

export enum UserType {
  CALLER,
  CALLEE,
}

class WebRTC {
  private readonly configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  public userType: UserType = UserType.CALLEE;
  private isInitialized = false;
  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;
  private remoteStream!: MediaStream;
  private roomId: string | null = null;

  public getLocalStream() {
    return this.localStream;
  }

  public getRemoteStream() {
    return this.remoteStream;
  }

  public getRoomId() {
    return this.roomId;
  }

  public async init() {
    if (!this.isInitialized) {
      await this.openUserMedia();
      this.isInitialized = true;
    }
    return this;
  }

  public async createRoom() {
    this.userType = UserType.CALLER;
    const roomRef = db.collection('rooms').doc();

    // console.log('Create PeerConnection with configuration: ', this.configuration);
    this.peerConnection = new RTCPeerConnection(this.configuration);

    this.registerPeerConnectionListeners();

    this.localStream
      .getTracks()
      .forEach((track) =>
        this.peerConnection.addTrack(track, this.localStream),
      );

    const callerCandidatesCollection = roomRef.collection('callerCandidates');

    this.peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        // console.log('Got final candidate!');
        return;
      }
      // console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    // console.log('Created offer:', offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    await roomRef.set(roomWithOffer);
    this.roomId = roomRef.id;
    // console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);

    this.peerConnection.addEventListener('track', (event) => {
      // console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        // console.log('Add a track to the remoteStream:', track);
        this.remoteStream.addTrack(track);
      });
    });

    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();

      if (
        !this.peerConnection.currentRemoteDescription &&
        data &&
        data.answer
      ) {
        // console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await this.peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });

    roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    return this.roomId;
  }

  public async joinRoom(roomId: string) {
    this.userType = UserType.CALLEE;
    const roomRef = db.collection('rooms').doc(`${roomId}`);
    const roomSnapshot = await roomRef.get();

    // console.log('Got room:', roomSnapshot.exists);
    if (roomSnapshot.exists) {
      // console.log('Create PeerConnection with configuration: ', this.configuration);
      this.peerConnection = new RTCPeerConnection(this.configuration);
      this.registerPeerConnectionListeners();
      this.localStream
        .getTracks()
        .forEach((track) =>
          this.peerConnection.addTrack(track, this.localStream),
        );
    }

    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    this.peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        // console.log('Got final candidate!');
        return;
      }
      // console.log('Got candidate: ', event.candidate);
      calleeCandidatesCollection.add(event.candidate.toJSON());
    });

    this.peerConnection.addEventListener('track', (event) => {
      // console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        // console.log('Add a track to the remoteStream:', track);
        this.remoteStream.addTrack(track);
      });
    });

    const offer = roomSnapshot.data()?.offer;
    // console.log('Got offer:', offer);
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    const answer = await this.peerConnection.createAnswer();
    // console.log('Created answer:', answer);
    await this.peerConnection.setLocalDescription(answer);

    const roomWithAnswer = {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    };
    await roomRef.update(roomWithAnswer);

    roomRef.collection('callerCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type == 'added') {
          let data = change.doc.data();
          // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }

  private async openUserMedia() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    this.remoteStream = new MediaStream();
  }

  public async hangUp() {
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => track.stop());

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach((track) => track.stop());
    }

    if (this.peerConnection) {
      this.peerConnection.close();
    }

    if (this.roomId) {
      const roomRef = db.collection('rooms').doc(this.roomId);
      const calleeCandidates = await roomRef
        .collection('callerCandidates')
        .get();
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await roomRef.delete();
    }

    this.userType = UserType.CALLEE;
    this.isInitialized = false;
    this.peerConnection = new RTCPeerConnection();
    this.localStream = new MediaStream();
    this.remoteStream = new MediaStream();
    this.roomId = null;
  }

  private registerPeerConnectionListeners() {
    this.peerConnection.addEventListener('icegatheringstatechange', () => {
      // console.log(`ICE gathering state changed: ${this.peerConnection.iceGatheringState}`);
    });

    this.peerConnection.addEventListener('connectionstatechange', () => {
      // console.log(`Connection state change: ${this.peerConnection.connectionState}`);
    });

    this.peerConnection.addEventListener('signalingstatechange', () => {
      // console.log(`Signaling state change: ${this.peerConnection.signalingState}`);
    });

    this.peerConnection.addEventListener('iceconnectionstatechange ', () => {
      // console.log(`ICE connection state change: ${this.peerConnection.iceConnectionState}`);
    });
  }
}

export default new WebRTC();
