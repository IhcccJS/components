/**
 * 处理按钮
 */
const buttonListHandler = (authority, button) => {
  if (!authority) return button;
  if (authority.status === 'hidden') return false;

  if (authority.status === 'disabled') {
    button.props = { ...button.props, disabled: true };
    delete button.tip;
  }

  if (authority.status === 'disabled') {
    if (!!authority.label) {
      button.props = { ...button.props, children: authority.label };
    }
    if (!!authority.icon) {
      button.props = { ...button.props, icon: authority.icon };
    }
  }

  return button;
};

/**
 * 处理列表
 */
const baseListHandler = (authority, column) => {
  if (!authority) return column;
  if (authority.status === 'hidden') return false;

  // if (authority.status === 'disabled') {
  //   // 处理列禁用
  // }

  return column;
};

/**
 * 处理表单
 */
const formHandler = (authority, column) => {
  if (!authority) return column;
  if (authority.status === 'hidden') return false;

  if (authority.status === 'disabled') {
    column.itemProps = { ...column.itemProps, disabled: true };
  }

  return column;
};

export default {
  buttonList: buttonListHandler,
  baseList: baseListHandler,
  form: formHandler,
};
