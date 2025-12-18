import { Drawer } from 'antd';
import InternalPopup from '../../popup/internal-popup';

function WrapperDrawer({ popupRef, onCancel, ...restProps }) {
  const handleCancel = async () => {
    const execute = await onCancel?.(popupRef);
    if (execute !== false) popupRef.close();
  };

  // const handleOk = async () => {
  //   const execute = await onOk?.(popupRef);
  //   if (execute !== false) popupRef.close();
  // };

  return <Drawer {...restProps} onClose={handleCancel} />;
}

export default {
  popup: InternalPopup,
  drawer: WrapperDrawer,
};
