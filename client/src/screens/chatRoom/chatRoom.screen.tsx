import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import classNames from 'classnames';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Fab,
  Collapse,
  TextField,
} from '@material-ui/core';
import {CallEndRounded, FileCopyRounded, MailRounded} from '@material-ui/icons';
import {TransitionProps} from '@material-ui/core/transitions';

import ROUTES from '../../routes';
import {sendMail} from '../../cloud.functions';
import WebRTC, {UserType} from '../../controllers/webrtc.controller';

import useStyles from './chatRoom.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatRoomScreen: React.FC = () => {
  let {roomId} = useParams<{roomId: string}>();
  const history = useHistory();
  const classes = useStyles();
  const secondaryVideoRef = React.useRef<HTMLVideoElement>(null);
  const primaryVideoRef = React.useRef<HTMLVideoElement>(null);
  const [isIceConnected, setIsIceConnected] = React.useState(false);
  const [copyInviteLinkStatus, setCopyInviteLinkStatus] = React.useState<
    'success' | 'unSuccess' | 'none'
  >('none');
  const [shouldOpenDialog, setShouldOpenDialog] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [calleeEmail, setCalleeEmail] = React.useState('');

  useEffect(() => {
    WebRTC.init().then(async (webrtc) => {
      if (webrtc.userType === UserType.CALLER) {
        setShouldOpenDialog(true);
      }
      if (secondaryVideoRef.current && primaryVideoRef.current) {
        primaryVideoRef.current.srcObject = webrtc.getLocalStream();
        if (webrtc.userType === UserType.CALLEE && roomId) {
          await webrtc.joinRoom(roomId);
          webrtc.onIceConnectionStateChange(handleIceConnectionStateChange);
        } else {
          webrtc.onIceConnectionStateChange(handleIceConnectionStateChange);
        }
      }
    });
  }, []);

  const handleIceConnectionStateChange = async (
    connectionState: RTCIceConnectionState,
  ) => {
    if (connectionState === 'connected') {
      setIsIceConnected(true);
      setShouldOpenDialog(false);
      if (secondaryVideoRef.current && primaryVideoRef.current) {
        secondaryVideoRef.current.srcObject = WebRTC.getLocalStream();
        primaryVideoRef.current.srcObject = WebRTC.getRemoteStream();
      }
    }
    if (connectionState === 'disconnected') {
      setIsIceConnected(false);
      setShouldOpenDialog(false);
      if (secondaryVideoRef.current && primaryVideoRef.current) {
        await handleHangup();
      }
    }
  };

  const handleHangup = async () => {
    await WebRTC.init();
    await WebRTC.hangUp();
    history.push(ROUTES.MAIN_SCREEN);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sendInviteLink = async () => {
    await sendMail(calleeEmail, roomId);
    setExpanded(!expanded);
  };

  const handleInviteEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setCalleeEmail(evt.target.value);

  const handleCopyInviteLink = () => {
    const reset = () => {
      setTimeout(() => {
        setCopyInviteLinkStatus('none');
      }, 1500);
    };
    navigator.clipboard.writeText(window.location.href).then(
      function () {
        setCopyInviteLinkStatus('success');
        reset();
      },
      function () {
        setCopyInviteLinkStatus('unSuccess');
        reset();
      },
    );
  };

  return (
    <div className={classes.root}>
      <span>chat room: {roomId}</span>
      <div>
        <video
          ref={secondaryVideoRef}
          className={classNames(classes.video, classes.secondaryVideo, {
            [classes.isHidden]: !isIceConnected,
          })}
          muted
          autoPlay
          playsInline
        />
        <video
          ref={primaryVideoRef}
          className={classNames(classes.video, classes.primaryVideo)}
          muted={!isIceConnected}
          autoPlay
          playsInline
        />
      </div>
      <Fab
        color="secondary"
        aria-label="call-end"
        className={classes.callEndBtn}
        onClick={handleHangup}>
        <CallEndRounded />
      </Fab>

      <Dialog
        open={shouldOpenDialog}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">
          Current room id is <b>{`(${WebRTC.getRoomId()})`}</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            send the room id <b>{`(${WebRTC.getRoomId()})`}</b> to start the
            conversation!
          </DialogContentText>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <TextField
              autoFocus
              margin="dense"
              label="(callee)Email Address"
              type="email"
              fullWidth
              onChange={handleInviteEmailChange}
            />
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            startIcon={<FileCopyRounded />}
            onClick={handleCopyInviteLink}>
            {copyInviteLinkStatus === 'none'
              ? 'copy invite link'
              : copyInviteLinkStatus === 'success'
              ? 'successfully copied to clipboard'
              : 'Oops, unable to copy, please tay again'}
          </Button>
          <Button
            color="primary"
            startIcon={<MailRounded />}
            onClick={expanded ? sendInviteLink : handleExpandClick}
            aria-expanded={expanded}
            disabled={expanded && !calleeEmail}>
            {expanded ? 'Send' : 'invite'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatRoomScreen;
