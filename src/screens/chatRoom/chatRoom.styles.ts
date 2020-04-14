import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  localVideo: {
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#000',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  remoteVideo: {
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#000',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
});
