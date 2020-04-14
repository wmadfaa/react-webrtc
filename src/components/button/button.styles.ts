import {createUseStyles} from 'react-jss';
import ColorUtils from 'color';

function colorContrast(color: string) {
  const lu = ColorUtils(color).luminosity();
  return lu > 0.3 ? '#212529' : '#fff';
}

interface VariantProps {
  background: string;
  border: string;
}

const variantStyles = ({background, border}: VariantProps) => {
  const color = colorContrast(background);
  const hoverBackground = ColorUtils(background).darken(0.075).toString();
  const hoverBorder = ColorUtils(border).darken(0.01).toString();
  const hoverColor = colorContrast(hoverBackground);
  const activeBackground = ColorUtils(background).darken(0.01).toString();
  const activeBorder = ColorUtils(border).darken(0.0125).toString();
  const activeColor = colorContrast(activeBackground);

  return {
    color,
    backgroundColor: background,
    borderColor: border,

    '&:hover': {
      color: hoverColor,
      backgroundColor: hoverBackground,
      borderColor: hoverBorder,
    },

    '&:focus, &:active': {
      boxShadow: {
        x: 0,
        y: 0,
        blur: 0,
        spread: 3.2,
        color: 'rgba(13, 110, 253, 0.25)',
      },
    },

    '&:active': {
      color: activeColor,
      backgroundColor: activeBackground,
      borderColor: activeBorder,
    },

    '&:disabled': {
      color: color,
      backgroundColor: background,
      borderColor: border,
    },
  };
};

export interface ButtonStylesProps {
  variant?: string;
}

export default createUseStyles({
  root: {
    display: 'inline-block',
    fontWeight: 400,
    color: '#212529',
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: 'transparent',
    border: {
      width: 1,
      type: 'solid',
      color: 'transparent',
    },
    padding: [6, 12],
    fontSize: 16,
    borderRadius: 4,
    transition: {
      property: 'color,background-color,border-color,box-shadow',
      duration: 0.15,
      timingFunction: 'ease-in-out',
    },

    '&:hover': {
      color: '#212529',
    },

    '&:focus': {
      outline: 0,
      boxShadow: {
        x: 0,
        y: 0,
        blur: 0,
        spread: 3.2,
        color: 'rgba(13, 110, 253, 0.25)',
      },
    },

    '&:active': {
      boxShadow: {
        x: 0,
        y: 0,
        blur: 0,
        spread: 3.2,
        color: 'rgba(13, 110, 253, 0.25)',
      },

      '&:disabled, fieldset:disabled &': {
        pointerEvents: 'none',
        opacity: 0.65,
        boxShadow: 'none',
      },
    },
  },

  variant: ({variant}: ButtonStylesProps) =>
    variant ? variantStyles({background: variant, border: variant}) : {},
});
