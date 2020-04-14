import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import WebRTC from '../../controllers/webrtc.controller';

import useStyles from './chatRoom.styles';

const ChatRoomScreen: React.FC = () => {
  let {roomId} = useParams();
  const classes = useStyles();
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    WebRTC.init().then(async (webrtc) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = webrtc.getLocalStream();
      }
    });
  }, []);

  const handleJoinRoom = async () => {
    if (remoteVideoRef.current && roomId) {
      await WebRTC.joinRoom(roomId);
      remoteVideoRef.current.srcObject = WebRTC.getRemoteStream();
    }
  };

  return (
    <div className={classes.root}>
      <button onClick={handleJoinRoom}>join</button>
      <span>chat room: {roomId}</span>
      <div>
        <video
          ref={localVideoRef}
          className={classes.localVideo}
          muted
          autoPlay
          playsInline></video>
        <video
          ref={remoteVideoRef}
          className={classes.remoteVideo}
          autoPlay
          playsInline></video>
      </div>
    </div>
  );
};

export default ChatRoomScreen;
