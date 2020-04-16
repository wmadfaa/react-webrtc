import React from 'react';

import useStyles from './chatEntire.styles';

import Message from './message/message';

export interface ChatEntireProps {}

const ChatEntire: React.FC<ChatEntireProps> = ({}) => {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<div className={styles.chatZone}>
				<div className={styles.messages}>
					<Message type="customer" />
					<Message type="moderator" />
				</div>
			</div>
			<form className="compose">
				<input type="text" placeholder="Type a message" />
			</form>
		</div>
	);
};

export default ChatEntire;
