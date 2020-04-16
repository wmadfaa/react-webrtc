import React from 'react';

import useStyles from './chatEntire.styles';

import Message from './message/message';
import MessageInput from './messageInput/messageInput';

export interface ChatEntireProps {}

const ChatEntire: React.FC<ChatEntireProps> = ({}) => {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<div className={styles.chatZone}>
				<div className={styles.messages}>
					<Message type="customer">xxxxx</Message>
					<Message type="moderator">xxxxx</Message>
				</div>
			</div>
			<MessageInput />
		</div>
	);
};

export default ChatEntire;
