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

  controlButtons: {
    position: 'absolute',
    left: 'calc(7.5vw - 40px)',
    top: '50%',
    transform: 'translate(0%, -50%)',
    zIndex: 999,
    borderRadius: '10px',
    background: '#16171a',
    boxShadow: '9px 9px 16px #0a0b0c, -9px -9px 16px #222328',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  controlButton: {
    transition: 'all 0.3s ease-in-out',
    margin: 8,
  },
});
