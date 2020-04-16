import React from 'react';
import { Fab } from '@material-ui/core';
import {
	MicRounded,
	VideocamRounded,
	ScreenShareRounded,
	ChatRounded,
	PictureInPictureRounded,
	CallEndRounded
} from '@material-ui/icons';

// components
import Header from './components/Header/Header';
import Videos from './components/videos/videos';
import ChatEntire from './components/chatEntire/chatEntire';

import useStyles from './chatRoom.styles';

const ChatRoomScreen: React.FC = () => {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<Header />
			<Videos remoteVideoText="Waiting for other user to join..." />
			<ChatEntire />
			<div className={styles.controlButtons}>
				<Fab size="medium" color="default" aria-label="toggle-microphone" className={styles.controlButton}>
					<MicRounded />
				</Fab>
				<Fab size="medium" color="default" aria-label="toggle-video" className={styles.controlButton}>
					<VideocamRounded />
				</Fab>
				<Fab size="medium" color="default" aria-label="shear-screen" className={styles.controlButton}>
					<ScreenShareRounded />
				</Fab>
				<Fab size="medium" color="default" aria-label="toggle-chat" className={styles.controlButton}>
					<ChatRounded />
				</Fab>
				<Fab
					size="medium"
					color="default"
					aria-label="toggle-picture-in-picture"
					className={styles.controlButton}
				>
					<PictureInPictureRounded />
				</Fab>
				<Fab size="medium" color="default" aria-label="call-end" className={styles.controlButton}>
					<CallEndRounded />
				</Fab>
			</div>
		</div>
	);
};

export default ChatRoomScreen;
