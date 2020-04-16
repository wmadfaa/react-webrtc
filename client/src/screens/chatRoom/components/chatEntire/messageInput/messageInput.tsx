import React from 'react';

import useStyles from './messageInput.styles';

const MessageInput: React.FC = () => {
	const styles = useStyles();

	return (
		<form className={styles.root}>
			<input type="text" placeholder="Type a message" className={styles.input} />
		</form>
	);
};

export default MessageInput;
