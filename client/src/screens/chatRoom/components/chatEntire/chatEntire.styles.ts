import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
  root: {
    position: 'absolute',
    height: '100%',
    right: 0,
    width: '17.5vw',
    padding: 0,
  },
  chatZone: {
    paddingTop: 20,
    boxSizing: 'border-box',
    position: 'absolute',
    height: '100%',
    right: 0,
    width: '17.5vw',
    overflow: 'scroll',
    fontSize: '0.8rem',

    '&::-webkit-scrollbar': {
      width: '0 !important',
    },
  },

  messages: {
    overflowX: 'hidden',
    paddingBottom: 80,
    overflow: '-moz-scrollbars-none',
  },
});
