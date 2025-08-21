export const roleButtonList = (authority, button) => {
  if (!authority) return false;

  if (authority.status === 'disabled') {
    if (authority.role === 'guest') {
      button.onClick = () => {
        alert('你点击了功能：' + button.key);
      };
      delete button.props.href;
    } else {
      button.props = { ...button.props, disabled: true };
    }
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
