import { Drawer } from 'antd';
import InternalPopup from '../../popup/internal-popup';

function WrapperDrawer({ modalRef, onCancel, ...restProps }) {
  const handleCancel = async () => {
    const execute = await onCancel?.(modalRef);
    if (execute !== false) modalRef.close();
  };

  // const handleOk = async () => {
  //   const execute = await onOk?.(modalRef);
  //   if (execute !== false) modalRef.close();
  // };

  return <Drawer {...restProps} onClose={handleCancel} />;
}

// TODO 替换为系统内部封装的弹窗和抽屉，antd 的过于笨重且不符合系统定制需求
export default {
  popup: InternalPopup,
  drawer: WrapperDrawer,
};
