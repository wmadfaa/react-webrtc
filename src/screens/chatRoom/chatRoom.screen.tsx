import React from 'react';

import useStyles from './chatRoom.styles';

const ChatRoomScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <span>chat room</span>
    </div>
  );
};

export default ChatRoomScreen;
