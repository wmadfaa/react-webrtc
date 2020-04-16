import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },

  root: {
    display: 'flex',
    width: '100%',
    background: '#16171b',
    margin: 0,
    padding: 0,
    opacity: 0,
    animation: '$fadeIn ease-in 1',
    animationFillMode: 'forwards',
    animationDuration: '0.3s',
    overflow: 'hidden',
  },
});
