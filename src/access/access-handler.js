// const buttonListHandler = (authority, button) => {
//   if (!authority) return true;
//   if (authority.status === 'disabled') {
//     button.props = { ...button.props, disabled: true };
//     delete button.tip;
//     return true;
//   } else if (authority.status === 'hidden') {
//     return false;
//   }
//   return true;
// };

/**
 * 处理按钮
 */
const buttonListHandler = (authority, button) => {
  if (!authority) return false;

  if (authority.status === 'disabled') {
    button.props = { ...button.props, disabled: true };
    delete button.tip;
  }

  if (authority.status === 'disabled' || authority.status === 'visible') {
    if (!!authority.label) {
      button.props = { ...button.props, children: authority.label };
    }
    if (!!authority.icon) {
      button.props = { ...button.props, icon: authority.icon };
    }
    return true;
  }

  return false;
};

/**
 * 处理列表
 */
const baseListHandler = (authority) => {
  if (!authority) return true;

  // if (authority.status === 'disabled') {
  //   // 处理列禁用
  // }

  if (authority.status === 'disabled' || authority.status === 'visible') {
    return true;
  }

  return true;
};

/**
 * 处理表单
 */
const formHandler = (authority, column) => {
  if (!authority) return true;

  if (authority.status === 'disabled') {
    column.itemProps = { ...column.itemProps, disabled: true };
  }

  if (authority.status === 'disabled' || authority.status === 'visible') {
    return true;
  }

  return true;
};

export default {
  buttonList: buttonListHandler,
  baseList: baseListHandler,
  form: formHandler,
};
