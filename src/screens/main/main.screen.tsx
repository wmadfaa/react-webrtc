import React from 'react';
import {useHistory} from 'react-router-dom';
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
} from '@material-ui/core';
import {
  GroupAddRounded,
  GroupRounded,
  SettingsRounded,
} from '@material-ui/icons';

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
}

const MainScreen: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const [state, setState] = React.useState<State>({
    isCreateRoomEnabled: false,
    isJoinRoomEnabled: false,
    loading: {
      createRoom: false,
    },
  });

  React.useEffect(() => {
    WebRTC.init().then((webrtc) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = webrtc.getLocalStream();
        setState((prev) => ({
          ...prev,
          isCreateRoomEnabled: true,
          isJoinRoomEnabled: true,
        }));
      }
    });
  }, []);

  const handleCreateRoom = async () => {
    setState((prev) => ({
      ...prev,
      loading: {...prev.loading, createRoom: true},
    }));
    const roomId = await WebRTC.createRoom();
    setState((prev) => ({
      ...prev,
      loading: {...prev.loading, createRoom: false},
    }));
    history.push(ROUTES.CHAT_ROOM.replace(':roomId', roomId));
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}>
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
          playsInline></CardMedia>
        <CardContent>{}</CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.btnWrapper}>
            <Button
              onClick={handleCreateRoom}
              disabled={!state.isCreateRoomEnabled || state.loading.createRoom}
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={<GroupAddRounded />}>
              Create room
            </Button>
            {state.loading.createRoom && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Button
            disabled={!state.isJoinRoomEnabled}
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<GroupRounded />}>
            Join room
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MainScreen;
