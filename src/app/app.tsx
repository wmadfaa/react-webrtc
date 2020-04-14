import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import ROUTES from '../routes';

import useStyles from './app.styles';

const App: React.FC = () => {
  const styles = useStyles();
  return (
    <Router>
      <div className={styles.root}>
        <Switch>
          <Route path={ROUTES.MAIN_SCREEN}>{}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
