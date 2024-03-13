import React from 'react';
import { MinusOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
// import { useMemoizedFn } from "ahooks";
import ButtonList from '../../../button-list';
import useDrag from './useDrag';
import useStyles from './style';

const HANDLE_CLASS = 'bc-modal-drag-handler';

function DragAbleModal(props) {
  const {
    modalRef,
    dragAble,
    cancelMask,
    handleClassName,
    buttons,
    classNames,
    footer,
    children,
    onHide,
    onCancel,
    onOk,
    ...restProps
  } = props;
  const { styles, cx } = useStyles();

  const focus = () => {
    if (!modalRef.focus) modalRef.bringToTop();
  };

  const { modalRender } = useDrag({
    enable: dragAble,
    handle: '.' + (handleClassName || HANDLE_CLASS),
    onMouseDown: focus,
  });

  const cancelMaskProps = {
    wrapClassName: cx(styles, 'bc-cancel-mask-modal-wrap'),
    maskClosable: false,
  };

  const _classNames = React.useMemo(() => {
    if (dragAble) {
      return {
        mask: cx(styles, 'bc-modal-mask'),
        ...classNames,
        header: cx(styles, HANDLE_CLASS, classNames?.header),
      };
    }
    return classNames;
  }, []);

  const handleHide = async () => {
    const execute = await onHide?.(modalRef);
    if (execute !== false) modalRef.hide();
  };

  const handleCancel = async () => {
    const execute = await onCancel?.(modalRef);
    if (execute !== false) modalRef.close();
  };

  const handleOk = async () => {
    const execute = await onOk?.(modalRef);
    if (execute !== false) modalRef.close();
  };

  const footerHandler = React.useMemo(() => {
    if (footer) return footer;
    if (buttons) {
      return () => (
        <ButtonList
          type="button"
          space="empty"
          layout="end"
          data={{ modalRef, onOk: handleOk, onCancel: handleCancel }}
          buttons={buttons}
        />
      );
    }
  }, [footer, buttons]);

  return (
    <Modal
      {...restProps}
      {...(cancelMask ? cancelMaskProps : {})}
      classNames={_classNames}
      modalRender={modalRender}
      zIndex={cancelMask ? modalRef.zIndex : 1002}
      footer={footerHandler}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Button
        className={cx(styles, 'bc-modal-mini')}
        type="text"
        icon={<MinusOutlined />}
        onClick={handleHide}
      />
      {children}
    </Modal>
  );
}

export default DragAbleModal;
