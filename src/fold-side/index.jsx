import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useUnmountedRef, useControllableValue } from 'ahooks';
import clsx from 'clsx';
import styles from './index.less';

function FoldSide(props) {
  const { title, placement = 'right', renderOnFirstOpen, className, style, children } = props;

  const unmountedRef = useUnmountedRef();
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [fold, setFold] = useControllableValue(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultFold',
    valuePropName: 'fold',
    trigger: 'onFoldChange',
  });

  React.useEffect(() => {
    if (unmountedRef.current) return;
    if (!fold && !firstOpen) setFirstOpen(true);
  }, [fold, firstOpen]);

  return (
    <div
      className={clsx(styles.sideContainer, className, {
        [styles['placement-' + placement]]: !!styles['placement-' + placement],
        [styles.fold]: fold,
      })}
      style={style}
    >
      <div
        className={clsx(styles.foldButton, {
          [styles.textButton]: !!title,
        })}
        onClick={() => setFold(!fold)}
      >
        {title || (placement === 'right' ? <RightOutlined /> : <LeftOutlined />)}
      </div>
      {!renderOnFirstOpen ? children : firstOpen && children}
    </div>
  );
}

export default FoldSide;
