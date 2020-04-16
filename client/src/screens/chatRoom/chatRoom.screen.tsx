import React from 'react';
import useStyles from './chatRoom.styles';

// components
import Header from './components/Header/Header';
import Videos from './components/videos/videos';

const ChatRoomScreen: React.FC = () => {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<Header />
			<Videos remoteVideoText="Waiting for other user to join..." />
		</div>
	);
};

export default ChatRoomScreen;
