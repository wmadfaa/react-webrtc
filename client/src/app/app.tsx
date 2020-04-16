import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ROUTES from '../routes';

// screens
// import MainScreen from '../screens/main/main.screen';
// old chatRoomScreen
// import ChatRoomScreen_old from '../screens/chatRoom.old/chatRoom.screen';

import ChatRoomScreen from '../screens/chatRoom/chatRoom.screen';

import useStyles from './app.styles';

const App: React.FC = () => {
	const styles = useStyles();
	return (
		<Router>
			<div className={styles.root}>
				<Switch>
					<Route exact path={ROUTES.CHAT_ROOM}>
						{/* <ChatRoomScreen_old /> */}
						<ChatRoomScreen />
					</Route>
					<Route exact path={ROUTES.MAIN_SCREEN}>
						{/* <MainScreen /> */}
						<ChatRoomScreen />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
