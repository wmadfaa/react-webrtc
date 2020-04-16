import React from 'react';

import useStyles, { MessageStylesProps } from './message.styles';

interface MessageProps extends MessageStylesProps {}

const Message: React.FC<MessageProps> = ({ type, children }) => {
	const styles = useStyles({ type });
	return (
		<div className={styles.root}>
			<div className={styles.messageBloc}>
				<div className={styles.message}>{children}</div>
			</div>
		</div>
	);
};

export default Message;
