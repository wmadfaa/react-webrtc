import {makeStyles, Theme} from '@material-ui/core/styles';

export interface MessageStylesProps {
  type: 'customer' | 'moderator';
}

export default makeStyles<Theme, MessageStylesProps>({
  root: ({type}) => {
    let styles: any = {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      padding: '0 16px 4px',
      marginBottom: 10,
    };

    if (type === 'customer') {
      styles = {...styles, paddingLeft: 40};
    }

    return styles;
  },

  messageBloc: ({type}) => {
    let styles: any = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      maxWidth: '100%',
      color: '#fff',
    };

    if (type === 'moderator') {
      styles = {
        ...styles,
        backgroundColor: 'rgb(29, 30, 33)',
        borderRadius: '20px 20px 20px 5px',
        boxShadow: '6px 6px 12px #030506, -6px -6px 12px #23242a',
      };
    }

    if (type === 'customer') {
      styles = {
        ...styles,
        backgroundColor: 'rgb(47, 48, 52)',
        borderRadius: '20px 20px 5px 20px',
        boxShadow: '6px 6px 12px #030506, -6px -6px 12px #22232a',
        marginLeft: 'auto',
      };
    }

    return styles;
  },

  message: {
    wordBreak: 'break-all',

    '& a': {
      textDecoration: 'underline',
    },
  },
});
