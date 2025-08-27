import React from 'react';

const EditCell = (porps) => {
  const { editing, component, children, style, ...restProps } = porps;
  return (
    <td {...restProps} style={editing ? { ...style, padding: '0 6px' } : style}>
      {editing ? component : children}
    </td>
  );
};

export default EditCell;
