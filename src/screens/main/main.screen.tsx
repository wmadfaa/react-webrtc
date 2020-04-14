import React from 'react';

import Card from '../../components/card/card.component';

import useStyles from './main.styles';
import Button from '../../components/button/button.component';

const MainScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Card shadow={1}>
        <h1>test card</h1>
        <Button variant="#0d6efd">test button</Button>
      </Card>
    </div>
  );
};

export default MainScreen;