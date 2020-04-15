import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardContent,
	Button,
	Grid,
	CardHeader,
	IconButton,
	CardMedia,
	CircularProgress,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@material-ui/core';
import { GroupAddRounded, GroupRounded, SettingsRounded } from '@material-ui/icons';

import ROUTES from '../../routes';
import WebRTC from '../../controllers/webrtc.controller';

import useStyles from './main.styles';

interface State {
	roomId?: string;
	isCreateRoomEnabled: boolean;
	isJoinRoomEnabled: boolean;
	loading: {
		createRoom: boolean;
	};
	isDialogOpen: boolean;
}

const MainScreen: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
	const localVideoRef = React.useRef<HTMLVideoElement>(null);
	const [ state, setState ] = React.useState<State>({
		isCreateRoomEnabled: false,
		isJoinRoomEnabled: false,
		loading: {
			createRoom: false
		},
		isDialogOpen: false,
		roomId: ''
	});

	React.useEffect(() => {
		WebRTC.init().then((webrtc) => {
			if (localVideoRef.current) {
				localVideoRef.current.srcObject = webrtc.getLocalStream();
				setState((prev) => ({
					...prev,
					isCreateRoomEnabled: true,
					isJoinRoomEnabled: true
				}));
			}
		});
	}, []);

	const handleCreateRoom = async () => {
		setState((prev) => ({
			...prev,
			loading: { ...prev.loading, createRoom: true }
		}));
		const roomId = await WebRTC.createRoom();
		setState((prev) => ({
			...prev,
			loading: { ...prev.loading, createRoom: false }
		}));
		history.push(ROUTES.CHAT_ROOM.replace(':roomId', roomId));
	};

	const handleCloseDialog = () => {
		setState((prev) => ({ ...prev, isDialogOpen: false }));
	};

	const handleOpenDialog = () => {
		setState((prev) => ({ ...prev, isDialogOpen: true }));
	};

	const handleOnRoomIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({ ...prev, roomId: event.target.value }));
	};

	const handleJoinRoom = async () => {
		if (state.roomId) {
			await WebRTC.init();
			await WebRTC.joinRoom(state.roomId);
			history.push(ROUTES.CHAT_ROOM.replace(':roomId', state.roomId));
		}
	};

	return (
		<Grid container alignItems="center" justify="center" className={classes.root}>
			<Card className={classes.content}>
				<CardHeader
					action={
						<IconButton aria-label="settings">
							<SettingsRounded />
						</IconButton>
					}
					title="Welcome to React-WebRTC!"
				/>
				<CardMedia
					ref={localVideoRef}
					className={classes.video}
					component="video"
					title="local-Video(your video)"
					muted
					autoPlay
					playsInline
				/>
				<CardContent>{}</CardContent>
				<CardActions className={classes.actions}>
					<div className={classes.btnWrapper}>
						<Button
							onClick={handleCreateRoom}
							disabled={!state.isCreateRoomEnabled || state.loading.createRoom}
							variant="contained"
							color="secondary"
							size="medium"
							startIcon={<GroupAddRounded />}
						>
							Create room
						</Button>
						{state.loading.createRoom && <CircularProgress size={24} className={classes.buttonProgress} />}
					</div>
					<Button
						onClick={handleOpenDialog}
						disabled={!state.isJoinRoomEnabled}
						variant="contained"
						color="secondary"
						size="medium"
						startIcon={<GroupRounded />}
					>
						Join room
					</Button>
				</CardActions>
			</Card>

			<Dialog open={state.isDialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Enter ID for room to join:</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Room ID"
						type="text"
						fullWidth
						onChange={handleOnRoomIdInputChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleJoinRoom} color="primary" disabled={!state.roomId}>
						Join
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};

export default MainScreen;
