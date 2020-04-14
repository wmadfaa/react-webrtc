import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import classNames from 'classnames';

import WebRTC, {UserType} from '../../controllers/webrtc.controller';

import useStyles from './chatRoom.styles';

const ChatRoomScreen: React.FC = () => {
  let {roomId} = useParams();
  const classes = useStyles();
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    WebRTC.init().then(async (webrtc) => {
      if (localVideoRef.current && remoteVideoRef.current) {
        localVideoRef.current.srcObject = webrtc.getLocalStream();
        if (webrtc.userType === UserType.CALLEE && roomId) {
          await webrtc.joinRoom(roomId);
        }
        remoteVideoRef.current.srcObject = WebRTC.getRemoteStream();
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <span>chat room: {roomId}</span>
      <div>
        <video
          ref={localVideoRef}
          className={classNames(classes.video, classes.localVideo)}
          muted
          autoPlay
          playsInline></video>
        <video
          ref={remoteVideoRef}
          className={classNames(classes.video, classes.remoteVideo)}
          autoPlay
          playsInline></video>
      </div>
    </div>
  );
};

export default ChatRoomScreen;
