import React from 'react';

import useStyles from './main.styles';

const MainScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <span>main screen</span>
    </div>
  );
};

export default MainScreen;
