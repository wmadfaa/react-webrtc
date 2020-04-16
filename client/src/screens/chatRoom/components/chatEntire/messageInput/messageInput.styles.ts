import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
  root: {
    width: 'calc(17.5vw - 40px)',
    height: 60,
    position: 'fixed',
    bottom: 0,
    right: 0,
    zIndex: 100,
    borderRadius: 20,
    boxShadow: '6px 6px 12px #030506, -6px -6px 12px #292a30',
    margin: 20,
    boxSizing: 'border-box',
    padding: 16,
    background: '#1c1d22',
    overflowX: 'hidden',
    overflow: '-moz-scrollbars-none',
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
  },
  input: {
    fontSize: 16,
    border: 'none',
    width: '100%',
    height: 'calc(100% - 5px)',
    resize: 'none',
    outline: 'none',
    backgroundColor: '#1c1d22',
    color: 'white',

    '&::placeholder': {
      color: 'white',
    },
  },
});
