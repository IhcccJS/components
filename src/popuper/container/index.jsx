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

// TODO 替换为系统内部封装的弹窗和抽屉，antd 的过于笨重且不符合系统定制需求
export default {
  popup: InternalPopup,
  drawer: WrapperDrawer,
};
