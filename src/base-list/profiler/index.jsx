import React from 'react';
import { Modal, Drawer, Spin } from 'antd';
import { useValue } from '../hooks';
import Detail from '../../detail';
import { cloneSomeChildren } from '../../utils/base';

const VIEWMODES = {
  modal: Modal,
  drawer: Drawer,
  none: React.Fragment,
};

const propsName = {
  modal: { cancel: 'onCancel' },
  drawer: { cancel: 'onClose' },
};

const Profiler = (props) => {
  const {
    index,
    mode,
    initialValues,
    children,
    onCancel,
    whichGetProps,
    ...restProps
  } = props;

  const { loading, value } = useValue(initialValues, {
    enable: restProps.open,
  });

  const Container = React.useMemo(() => VIEWMODES[mode] || VIEWMODES.none, []);

  const renderChildrenNodes = cloneSomeChildren(
    children,
    { data: value },
    whichGetProps,
  );

  return React.createElement(
    Container,
    !!propsName[mode]
      ? {
          ...restProps,
          destroyOnClose: true,
          [propsName[mode].cancel]: onCancel,
        }
      : void 0,
    <Spin spinning={loading}>{renderChildrenNodes}</Spin>,
  );
};

Profiler.defaultProps = {
  mode: 'modal',
  footer: null,
  whichGetProps: (child) => child.type === Detail,
};

export default Profiler;
