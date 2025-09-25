import React from 'react';
import DragablePopup from './dragable-popup';

function InternalPopup(props) {
  const { popupRef, onHide, onCancel, ...restProps } = props;

  const focus = () => {
    if (!popupRef.focus) popupRef.bringToTop();
  };

  const popupId = React.useMemo(() => {
    if (!popupRef.key) return '';
    return 'popup_' + popupRef.key.replace(/\/|\-/g, '_');
  }, []);

  return (
    <DragablePopup
      id={popupId}
      mask={false}
      cancelMask
      zIndex={popupRef.zIndex}
      classNames={{ root: popupRef.focus ? 'bc-popup-focus' : '' }}
      onPopupClick={focus}
      onHide={async () => {
        const execute = await onHide?.(popupRef);
        if (execute !== false) popupRef.hide();
      }}
      onCancel={async () => {
        const execute = await onCancel?.(popupRef);
        if (execute !== false) popupRef.close();
      }}
      {...restProps}
    />
  );
}

export default InternalPopup;
