import React from 'react';
import {useParams} from 'react-router-dom';

import useStyles from './chatRoom.styles';

const ChatRoomScreen: React.FC = () => {
  let {roomId} = useParams();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <span>chat room: {roomId}</span>
    </div>
  );
};

export default ChatRoomScreen;
