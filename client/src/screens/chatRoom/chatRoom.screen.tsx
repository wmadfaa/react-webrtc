import React from 'react';
import useStyles from './chatRoom.styles';

// components
import Header from './components/Header/Header';

const ChatRoomScreen: React.FC = () => {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<Header />
		</div>
	);
};

export default ChatRoomScreen;
