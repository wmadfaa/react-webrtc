import React from 'react';

import useStyles from './Header.styles';

const Header: React.FC = () => {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<p className={styles.logo}>react webrtc</p>
		</div>
	);
};

export default Header;
