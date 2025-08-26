import React from 'react';
import cx from 'clsx';
import { MinusOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
// import { useMemoizedFn } from "ahooks";
import ButtonList from '@/components/@comp/button-list';
import { isArray } from '@wowon/utils';
import useDrag from './useDrag';
// import useStyles from './style';
import './index.less';

const HANDLE_CLASS = 'bc-modal-drag-handler';

function DragAbleModal(props) {
  const {
    modalRef,
    dragAble,
    cancelMask,
    handleClassName,
    buttons,
    modalPadding,
    classNames,
    footer,
    children,
    onHide,
    onCancel,
    onOk,
    ...restProps
  } = props;
  // const { styles, cx } = useStyles();

  const focus = () => {
    if (!modalRef.focus) modalRef.bringToTop();
  };

  const { modalRender } = useDrag({
    enable: dragAble,
    className: modalRef.focus ? 'bc-modal-shadow' : '',
    handle: '.' + (handleClassName || HANDLE_CLASS),
    onMouseDown: focus,
  });

  const cancelMaskProps = {
    wrapClassName: cx('bc-cancel-mask-modal-wrap', modalPadding === false && 'bc-modal-padding-none'),
    maskClosable: false,
  };

  const _classNames = React.useMemo(() => {
    if (dragAble) {
      return {
        mask: cx('bc-modal-mask'),
        ...classNames,
        header: cx(HANDLE_CLASS, classNames?.header),
        body: 'bc-modal-content',
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
    if (!isArray(footer)) return footer;
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

  // todo 对弹窗头部进行重写，可以隐藏头部，可以添加自定义按钮
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
      <Button className={'bc-modal-mini'} type="text" icon={<MinusOutlined />} onClick={handleHide} />
      {children}
    </Modal>
  );
}

export default DragAbleModal;
