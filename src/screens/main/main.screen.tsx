import React from 'react';

import useStyles from './main.styles';

const MainScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h1>test card</h1>
    </div>
  );
};

export default MainScreen;
