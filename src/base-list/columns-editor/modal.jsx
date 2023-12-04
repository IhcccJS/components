import React from 'react';
import { Modal } from 'antd';
import { useUpdate, useUnmountedRef } from 'ahooks';
import ButtonList from '../../button-list';
import ColumnsEditor from './index';

function ColumnsEditorModal({
  type,
  column,
  canAlign,
  canFixed,
  canSort,
  defaultValue,
  value,
  onOk,
  ...restProps
}) {
  const editColumnsRef = React.useRef([]);
  const unmountedRef = useUnmountedRef();
  const update = useUpdate();

  const handleChange = React.useCallback((editValue) => {
    editColumnsRef.current = editValue;
    update();
  }, []);

  const buttons = React.useMemo(
    () => [
      {
        key: 'cancel',
        props: { children: '取消' },
        space: 'full',
        onClick: restProps.onCancel,
      },
      {
        key: 'reset',
        props: { danger: true, children: '重置' },
        onClick: ({ defaultValue }) => {
          handleChange(defaultValue);
        },
      },
      {
        key: 'save',
        props: { type: 'primary', children: '保存' },
        onClick: ({ value, defaultValue, onOk }) => {
          onOk && onOk(value, value === defaultValue);
        },
      },
    ],
    [],
  );

  React.useEffect(() => {
    if (unmountedRef.current) return;
    if (restProps.open) handleChange(value);
  }, [restProps.open, value]);

  const modalFooter = (
    <ButtonList
      access={false}
      type="button"
      buttons={buttons}
      data={{
        defaultValue,
        value: editColumnsRef.current,
        onOk,
      }}
    />
  );

  return (
    <Modal {...restProps} footer={modalFooter}>
      <ColumnsEditor
        column={column}
        canAlign={canAlign}
        canFixed={canFixed}
        canSort={canSort}
        value={editColumnsRef.current}
        onChange={handleChange}
      />
    </Modal>
  );
}

ColumnsEditorModal.defaultProps = {
  width: 1260,
  title: '数据显示设置',
};

export default ColumnsEditorModal;
