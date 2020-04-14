import React, {HTMLProps} from 'react';
import classNames from 'classnames';

import useStyles, {ButtonStylesProps} from './button.styles';

export interface ButtonProps
  extends HTMLProps<HTMLButtonElement>,
    ButtonStylesProps {
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  const styles = useStyles({variant});

  return (
    <button
      className={classNames(styles.root, styles.variant, className)}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
