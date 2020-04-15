import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Fab } from '@material-ui/core';
import { CallEndRounded } from '@material-ui/icons';

import ROUTES from '../../routes';
import WebRTC, { UserType } from '../../controllers/webrtc.controller';

import useStyles from './chatRoom.styles';

const ChatRoomScreen: React.FC = () => {
	let { roomId } = useParams();
	const history = useHistory();
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

	const handleHangup = async () => {
		await WebRTC.init();
		await WebRTC.hangUp();
		history.push(ROUTES.MAIN_SCREEN);
	};

	return (
		<div className={classes.root}>
			<span>chat room: {roomId}</span>
			<div>
				<video
					ref={localVideoRef}
					className={classNames(classes.video, classes.localVideo)}
					muted
					autoPlay
					playsInline
				/>
				<video
					ref={remoteVideoRef}
					className={classNames(classes.video, classes.remoteVideo)}
					autoPlay
					playsInline
				/>
			</div>
			<Fab color="secondary" aria-label="call-end" className={classes.callEndBtn} onClick={handleHangup}>
				<CallEndRounded />
			</Fab>
		</div>
	);
};

export default ChatRoomScreen;
