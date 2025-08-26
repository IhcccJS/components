import React from 'react';
import DragablePopup from './dragable-popup';

function InternalPopup(props) {
  const { modalRef, onHide, onCancel, ...restProps } = props;

  const focus = () => {
    if (!modalRef.focus) modalRef.bringToTop();
  };

  const popupId = React.useMemo(() => {
    if (!modalRef.key) return '';
    return 'popup_' + modalRef.key.replace(/\/|\-/g, '_');
  }, []);

  return (
    <DragablePopup
      id={popupId}
      mask={false}
      cancelMask
      zIndex={modalRef.zIndex}
      classNames={{ root: modalRef.focus ? 'popup-focus' : '' }}
      onPopupClick={focus}
      onHide={async () => {
        const execute = await onHide?.(modalRef);
        if (execute !== false) modalRef.hide();
      }}
      onCancel={async () => {
        const execute = await onCancel?.(modalRef);
        if (execute !== false) modalRef.close();
      }}
      {...restProps}
    />
  );
}

export default InternalPopup;
