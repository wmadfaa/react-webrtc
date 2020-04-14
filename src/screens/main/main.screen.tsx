import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Grid,
  CardHeader,
  IconButton,
  CardMedia,
} from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
import {
  CameraAltRounded,
  GroupAddRounded,
  GroupRounded,
  SettingsRounded,
} from '@material-ui/icons';

import useStyles from './main.styles';

interface State {
  isCreateRoomEnabled: boolean;
  isJoinRoomEnabled: boolean;
}

const MainScreen: React.FC = () => {
  const classes = useStyles();
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const [state, setState] = React.useState<State>({
    isCreateRoomEnabled: false,
    isJoinRoomEnabled: false,
  });

  const openUserMedia = async () => {
    if (!localVideoRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localVideoRef.current.srcObject = stream;

    setState((prev) => ({
      ...prev,
      isCreateRoomEnabled: true,
      isJoinRoomEnabled: true,
    }));
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
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<CameraAltRounded />}
            onClick={openUserMedia}>
            Open camera & microphone
          </Button>
          <Button
            disabled={!state.isCreateRoomEnabled}
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<GroupAddRounded />}>
            Create room
          </Button>
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
