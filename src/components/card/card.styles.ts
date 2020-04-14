import {createUseStyles} from 'react-jss';

export interface CardStylesProps {
  shadow?: 1 | 2 | 3 | 4 | 5;
  shadowOnHover?: 1 | 2 | 3 | 4 | 5;
}

const renderShadow = (
  shadow: CardStylesProps['shadow'] | CardStylesProps['shadowOnHover'],
) => {
  const shadows = [
    {
      x: 0,
      y: 1,
      blur: 3,
      color: 'rgba(0,0,0,0.12)',
    },
    {
      x: 0,
      y: 3,
      blur: 6,
      color: 'rgba(0,0,0,0.16)',
    },
    {
      x: 0,
      y: 10,
      blur: 20,
      color: 'rgba(0,0,0,0.19)',
    },
    {
      x: 0,
      y: 14,
      blur: 28,
      color: 'rgba(0,0,0,0.25)',
    },
    {
      x: 0,
      y: 19,
      blur: 38,
      color: 'rgba(0,0,0,0.30)',
    },
  ];
  {
    if (shadow) {
      const {x, y, blur, color} = shadows[shadow - 1];
      return `${x}px ${y}px ${blur}px ${color}`;
    }
    return null;
  }
};

export default createUseStyles({
  root: {
    padding: 16,
    margin: 16,
    borderRadius: 2,
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#fff',
    transition: {
      property: 'all',
      duration: 0.3,
      timingFunction: 'cubic-bezier(.25,.8,.25,1)',
    },
    boxShadow: ({shadow}: CardStylesProps) => renderShadow(shadow),
    '&:hover': {
      boxShadow: ({shadowOnHover}: CardStylesProps) =>
        renderShadow(shadowOnHover),
    },
  },
});
