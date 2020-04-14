import firebase from '../firebase';

const db = firebase.firestore();

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

  private isInitialized = false;

  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;
  private remoteStream!: MediaStream;
  private roomDialog = null;
  private roomId: string | null = null;

  public async init() {
    if (!this.isInitialized) {
      await this.openUserMedia();
      this.isInitialized = true;
    }
    return this;
  }

  public async createRoom() {
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

    await roomRef.set(offer);
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
  }

  private async openUserMedia() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    this.remoteStream = new MediaStream();
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