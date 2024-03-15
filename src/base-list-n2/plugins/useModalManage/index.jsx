import React from 'react';
import Modal from '../../../modaler/container/modal';

const separate = (obj, names) => {
  const pick = {};
  const unpick = {};
  if (!obj) return [pick, unpick];
  if (!names) return [pick, obj];
  for (const key in obj) {
    if (names.indexOf(key) > -1) {
      pick[key] = obj[key];
    } else {
      unpick[key] = obj[key];
    }
  }
  return [pick, unpick];
};

function useModalManage(instance, props) {
  const [openModal, setOpenModal] = React.useState([]);
  const modalRef = React.useRef({});

  modalRef.current.open = (name, p) => {
    setOpenModal([
      { ...props.modals, props: { ...props.modals.props, ...p, open: true } },
    ]);
  };

  modalRef.current.hide = (name) => {
    setOpenModal([
      { ...props.modals, props: { ...props.modals.props, open: false } },
    ]);
  };

  modalRef.current.close = (name) => {
    setOpenModal([]);
  };

  modalRef.current.bringToTop = () => {};

  return {
    name: 'modalManage',
    modal: modalRef.current,
    content: openModal.map((item) => {
      const [contentProps, modalProps] = separate(item.props, item.transfer);
      return (
        <Modal {...modalProps} modalRef={modalRef.current} key={item.name}>
          {React.createElement(item.content, contentProps)}
        </Modal>
      );
    }),
  };
}

export default useModalManage;
