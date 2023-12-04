import React from 'react';
import useStyles from './style';

const Item = ({
  item,
  index,
  className,
  size,
  extra,
  children,
  ...restProps
}) => {
  const { styles, cx } = useStyles();

  return (
    <div
      className={cx(styles, 'bc-image-list-item', 'size-' + size, className)}
      {...restProps}
    >
      <div className={cx(styles, 'bc-image-list-item-container')}>
        {children}
      </div>
      {extra}
    </div>
  );
};

Item.defaultProps = {
  size: 'middle',
};

export default Item;
