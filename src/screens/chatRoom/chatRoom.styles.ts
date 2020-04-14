import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#000',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  localVideo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 256,
    zIndex: 1,
  },
  remoteVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
  },
});
