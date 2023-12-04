import React from 'react';

const EditCell = ({
  editing,
  dataIndex,
  inputNode,
  inputNodeProps,
  valuePropName,
  value,
  onChange,
  children,
  style,
  ...restProps
}) => {
  const canEdit = editing && !!inputNode;
  return (
    <td {...restProps} style={canEdit ? { ...style, padding: '0 6px' } : style}>
      {canEdit
        ? React.createElement(
            inputNode,
            Object.assign({}, inputNodeProps, {
              [valuePropName]: value,
              onChange: onChange,
            }),
          )
        : children}
    </td>
  );
};

export default EditCell;
