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
  secondaryVideo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 256,
    zIndex: 1,
  },
  primaryVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
  },
  callEndBtn: {
    position: 'absolute',
    bottom: 32,
    right: 'calc(50% - 28px)',
    zIndex: 1,
  },
  isHidden: {
    display: 'none',
  },
});
