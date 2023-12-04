import React from 'react';
import { Modal, Button } from 'antd';
import useStyles from './style';

/**
 * Modal 弹出窗
 * @param {ReactDOM} props.content modal 内容
 */
const ModalWrapper = (props) => {
  const {
    content,
    leftButtons,
    rightButtons,
    getInstance,
    onBeforeVisible,
    onAfterVisible,
    onOk,
    okButtonProps,
    onCancel,
    cancelButtonProps,
    children,
    style,
    ...restProps
  } = props;
  const { styles, cx } = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleVisible = () => {
    setOpen((open) => {
      const newOpen = !open;
      if (onBeforeVisible && onBeforeVisible(newOpen) === false) return open;
      return newOpen;
    });
  };

  React.useEffect(() => {
    onAfterVisible && onAfterVisible(open);
  }, [open]);

  React.useEffect(() => {
    getInstance && getInstance({ toggleVisible });
  }, []);

  return (
    <React.Fragment>
      {React.isValidElement(children) &&
        React.Children.only(children) &&
        React.cloneElement(children, { onClick: toggleVisible })}
      <Modal
        footer={
          <div className={cx(styles, 'modalFooter')}>
            <div>
              <Button {...cancelButtonProps} onClick={toggleVisible}>
                关闭
              </Button>
              {leftButtons}
            </div>
            <div>
              {rightButtons}
              {onOk && (
                <Button type="primary" {...okButtonProps} onClick={onOk}>
                  确定
                </Button>
              )}
            </div>
          </div>
        }
        {...restProps}
        open={open}
        children={content}
        onCancel={toggleVisible}
        style={{ maxWidth: 'calc(100vw - 32px)', ...style }}
      />
    </React.Fragment>
  );
};

export default ModalWrapper;
