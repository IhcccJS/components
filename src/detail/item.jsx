import React from 'react';
import { isFunction } from '@ihccc/utils';
import Text from '../text';
import useStyles from './style';

const Item = (props) => {
  const { className, label, value, record, render, showColon, layout } = props;
  const { styles, cx } = useStyles();

  const content = React.useMemo(() => {
    if (isFunction(render)) return render(value, record);
    return <Text label={value} />;
  }, [value, record]);

  if (content === void 0) return null;

  return (
    <div
      className={cx(
        styles,
        'bc-detail-item',
        `bc-detail-item-${layout}`,
        className,
      )}
    >
      {label && (
        <span className={'bc-detail-item-title'}>
          {label}
          {showColon && '：'}
        </span>
      )}
      <span className={'bc-detail-item-content'}>{content}</span>
    </div>
  );
};

Item.defaultProps = {
  showColon: true,
  layout: 'vertical' || 'horizontal',
};

export default Item;
