import React from 'react';
import clsx from 'clsx';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useUnmountedRef, useControllableValue } from 'ahooks';

function FoldSide(props) {
  const { title, placement = 'left', renderOnFirstOpen, className, style, children } = props;

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
      className={clsx('bc-side-container', className, {
        ['bc-placement-' + placement]: !!placement,
        'bc-fold': fold,
      })}
      style={style}
    >
      <div
        className={clsx('bc-fold-button', {
          'bc-text-button': !!title,
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
