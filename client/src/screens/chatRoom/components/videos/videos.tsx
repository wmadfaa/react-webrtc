import React from 'react';

import useStyles, { VideosStylesProps } from './videos.styles';

export interface VideosProps extends VideosStylesProps {
	remoteVideoText?: string;
}

const Videos: React.FC<VideosProps> = ({ isRemoteVideoFullWidth, remoteVideoText }) => {
	const styles = useStyles({ isRemoteVideoFullWidth });

	return (
		<React.Fragment>
			<p className={styles.remoteVideoText}>{remoteVideoText}</p>
			<video className={styles.remoteVideo} autoPlay playsInline />
			<div className={styles.moveable}>
				<p className={styles.localVideoText}>No webcam input</p>
				<video className={styles.localVideo} autoPlay muted playsInline />
			</div>
		</React.Fragment>
	);
};

export default Videos;
