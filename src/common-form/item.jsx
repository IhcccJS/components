import React from 'react';
import { Form } from 'antd';
import { isString, isArray, isObject } from '@ihccc/utils';
import Column from '../column';
import { childrenSetter } from './setter';

export const Item = (props) => {
  const {
    className,
    gridArea,
    span,
    grid,
    full,
    important,
    style,
    show,
    inputNode,
    inputNodeProps,
    disabled,
    children,
    ...restProps
  } = props;

  if (!show) return null;

  const columnProps = {
    className,
    gridArea,
    span,
    grid,
    full,
    important,
    style,
  };

  const childrenNode = React.useMemo(() => {
    if (children) {
      return React.cloneElement(children, { disabled });
    }

    if (React.isValidElement(inputNode)) {
      return React.cloneElement(inputNode, { ...inputNodeProps, disabled });
    }

    if (isString(inputNode) || isArray(inputNode) || isObject(inputNode)) {
      const setterNode = childrenSetter.get(inputNode);
      if (!!setterNode) {
        return React.createElement(setterNode, { ...inputNodeProps, disabled });
      }
    }

    return null;
  }, [children, disabled, inputNodeProps]);

  return (
    <Column {...columnProps}>
      <React.Fragment>
        {/* {!restProps.name ? (
          childrenNode
        ) : (
          <Form.Item {...restProps}>{childrenNode}</Form.Item>
        )} */}
        <Form.Item {...restProps}>{childrenNode}</Form.Item>
      </React.Fragment>
    </Column>
  );
};

Item.defaultProps = {
  show: true,
};

Item.children = childrenSetter;

export default Item;
