import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
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
    justifyContent: 'space-between',
  },
});
