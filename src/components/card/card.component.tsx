import React, {HTMLProps} from 'react';
import classNames from 'classnames';

import useStyles, {CardStylesProps} from './card.styles';

export interface CardProps extends HTMLProps<HTMLDivElement>, CardStylesProps {}

const Card: React.FC<CardProps> = ({
  children,
  className,
  shadow,
  shadowOnHover,
  ...props
}) => {
  const styles = useStyles({shadow, shadowOnHover});

  return (
    <div className={classNames(styles.root, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
