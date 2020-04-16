import {makeStyles, Theme} from '@material-ui/core/styles';

export interface VideosStylesProps {
  isRemoteVideoFullWidth?: boolean;
}

export default makeStyles<Theme, VideosStylesProps>({
  remoteVideoText: {
    boxSizing: 'border-box',
    margin: 0,
    width: '65vw',
    position: 'absolute',
    top: 'calc(80%)',
    left: '20vw',
    zIndex: 1,
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'left',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '0 0 10px 10px',
    padding: 10,
  },
  remoteVideo: {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: ({isRemoteVideoFullWidth: rvw}) => (rvw ? '100%' : '65%'),
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: 10,
    backgroundColor: '#16171a',
    backgroundImage:
      'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNMzguNTIgMzMuMzdMMjEuMzYgMTYuMkE2My42IDYzLjYgMCAwIDEgNTkuNS4xNnYyNC4zYTM5LjUgMzkuNSAwIDAgMC0yMC45OCA4LjkyeiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0zOC41MiAzMy4zN0wyMS4zNiAxNi4yQTYzLjYgNjMuNiAwIDAgMSA1OS41LjE2djI0LjNhMzkuNSAzOS41IDAgMCAwLTIwLjk4IDguOTJ6IiBmaWxsPSIjYzBjMGMwIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA2NCA2NCkiLz48cGF0aCBkPSJNMzguNTIgMzMuMzdMMjEuMzYgMTYuMkE2My42IDYzLjYgMCAwIDEgNTkuNS4xNnYyNC4zYTM5LjUgMzkuNSAwIDAgMC0yMC45OCA4LjkyeiIgZmlsbD0iI2MwYzBjMCIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgNjQpIi8+PHBhdGggZD0iTTM4LjUyIDMzLjM3TDIxLjM2IDE2LjJBNjMuNiA2My42IDAgMCAxIDU5LjUuMTZ2MjQuM2EzOS41IDM5LjUgMCAwIDAtMjAuOTggOC45MnoiIGZpbGw9IiNjMGMwYzAiIHRyYW5zZm9ybT0icm90YXRlKDEzNSA2NCA2NCkiLz48cGF0aCBkPSJNMzguNTIgMzMuMzdMMjEuMzYgMTYuMkE2My42IDYzLjYgMCAwIDEgNTkuNS4xNnYyNC4zYTM5LjUgMzkuNSAwIDAgMC0yMC45OCA4LjkyeiIgZmlsbD0iI2MwYzBjMCIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDY0IDY0KSIvPjxwYXRoIGQ9Ik0zOC41MiAzMy4zN0wyMS4zNiAxNi4yQTYzLjYgNjMuNiAwIDAgMSA1OS41LjE2djI0LjNhMzkuNSAzOS41IDAgMCAwLTIwLjk4IDguOTJ6IiBmaWxsPSIjYzBjMGMwIiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PHBhdGggZD0iTTM4LjUyIDMzLjM3TDIxLjM2IDE2LjJBNjMuNiA2My42IDAgMCAxIDU5LjUuMTZ2MjQuM2EzOS41IDM5LjUgMCAwIDAtMjAuOTggOC45MnoiIGZpbGw9IiNjMGMwYzAiIHRyYW5zZm9ybT0icm90YXRlKDI3MCA2NCA2NCkiLz48cGF0aCBkPSJNMzguNTIgMzMuMzdMMjEuMzYgMTYuMkE2My42IDYzLjYgMCAwIDEgNTkuNS4xNnYyNC4zYTM5LjUgMzkuNSAwIDAgMC0yMC45OCA4LjkyeiIgZmlsbD0iI2MwYzBjMCIgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDY0IDY0KSIvPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiB2YWx1ZXM9IjAgNjQgNjQ7NDUgNjQgNjQ7OTAgNjQgNjQ7MTM1IDY0IDY0OzE4MCA2NCA2NDsyMjUgNjQgNjQ7MjcwIDY0IDY0OzMxNSA2NCA2NCIgY2FsY01vZGU9ImRpc2NyZXRlIiBkdXI9IjcyMG1zIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvZz48L3N2Zz4=)',
    backgroundSize: 65,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },

  localVideo: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    transform: 'scaleX(-1)',
    background: '#16171a',
  },
  moveable: {
    zIndex: 100,
    position: 'absolute',
    width: '15%',
    cursor: 'move',

    '& p': {
      zIndex: 101,
      position: 'absolute',
      color: 'white',
      whiteSpace: 'pre-wrap',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontWeight: 'bold',
      background: 'rgba(0, 0, 0, 0.12)',
      padding: 10,
      borderRadius: 5,
    },
  },
  localVideoText: {},
});
