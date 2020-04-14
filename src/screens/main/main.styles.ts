import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    minWidth: 604,
  },
  video: {
    width: 604,
    height: 453,
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#000',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
