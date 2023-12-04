import React from 'react';
import { Tooltip, Dropdown } from 'antd';
import { isArray, isObject } from '@ihccc/utils';
import { Confirm } from './buttons';
import Space from './space';
import { buttonSetter } from './setter';
import { handleButtonConfig } from './utils';
import useStyles from './style';
import useAccess from '../access/useAccess';

const nodeEvent = {
  a: 'onClick',
  button: 'onClick',
  switch: 'onChange',
};

function RenderButtons(props) {
  const {
    type,
    space,
    inline,
    wrap,
    reverse,
    layout,
    buttons,
    baseProps,
    renderType,
    style,
  } = props;
  const { styles, cx } = useStyles();
  const spaceTypeRef = React.useRef();

  const lastIndex = buttons.length - 1;

  const handleDropdownMenu = React.useCallback((buttons) => {
    const items = buttons.map((btn) => {
      return {
        ...btn.props,
        key: btn.key,
      };
    });
    const onClick = (item) => {
      for (let index = 0; index < buttons.length; index++) {
        if (buttons[index].key === item.key) {
          buttons[index].onClick && buttons[index].onClick(item);
          return;
        }
      }
    };
    return { items, onClick };
  }, []);

  const renderbuttons = buttons.map((item, index) => {
    if (isArray(item)) {
      const [group, ...subButtons] = item;
      return (
        <RenderButtons
          type={type}
          space={index === lastIndex ? 'none' : space}
          buttons={subButtons}
          baseProps={baseProps}
          renderType={group.type}
          key={group.key}
        />
      );
    }

    const btnType = item.type || type || 'a';

    const eventName = nodeEvent[btnType];

    let button = React.createElement(buttonSetter.get(btnType), {
      ...baseProps?.[btnType],
      ...item.props,
      [eventName]: item[eventName],
    });

    if (!!item.dropdown) {
      button = (
        <Dropdown
          {...baseProps?.dropdown}
          {...item.props}
          menu={handleDropdownMenu(item.items)}
        >
          {button}
        </Dropdown>
      );
    } else if (!!item.onConfirm) {
      button = (
        <Confirm
          {...baseProps?.confirm}
          {...item.confirm}
          onConfirm={item.onConfirm}
        >
          {button}
        </Confirm>
      );
    }

    if (!!item.tip) {
      button = (
        <Tooltip
          {...baseProps?.tip}
          {...(isObject(item.tip) ? item.tip : { title: item.tip })}
        >
          {button}
        </Tooltip>
      );
    }

    spaceTypeRef.current =
      item.space || space || (btnType === 'a' ? 'divider' : 'empty');

    return (
      <React.Fragment key={item.key}>
        {button}
        {((!renderType && index !== lastIndex) ||
          (renderType === 'dropdown' && !item.group)) &&
          space !== 'none' && <Space type={spaceTypeRef.current} />}
      </React.Fragment>
    );
  });

  if (renderType === 'dropdown') return renderbuttons;

  return (
    <React.Fragment>
      <div
        className={cx(
          styles,
          'bc-action-buttons',
          layout && 'bc-action-buttons-layout-' + layout,
          {
            'bc-action-buttons-group': !!renderType,
            'bc-action-buttons-inline': !!inline,
            'bc-action-buttons-wrap': !!wrap,
            'bc-action-buttons-reverse': !!reverse,
          },
        )}
        style={style}
      >
        {renderbuttons}
      </div>
      {renderType && spaceTypeRef.current !== 'none' && (
        <Space type={spaceTypeRef.current} />
      )}
    </React.Fragment>
  );
}

function ButtonList(props) {
  const {
    access,
    type,
    space,
    inline,
    wrap,
    reverse,
    layout,
    data,
    buttons,
    baseProps,
    render,
    style,
  } = props;

  if (!(buttons || []).length > 0) return null;

  const accessHandle = useAccess(
    Object.assign(
      {
        data: buttons,
        handler: 'buttonList',
      },
      isObject(access) ? access : { name: access },
    ),
  );

  const buttonList = React.useMemo(() => {
    return handleButtonConfig(accessHandle?.passedData || [], data, type);
  }, [accessHandle?.passedData, data]);

  const renderDom = (
    <RenderButtons
      type={type}
      space={space}
      inline={inline}
      wrap={wrap}
      reverse={reverse}
      layout={layout}
      buttons={buttonList}
      baseProps={baseProps}
      style={style}
    />
  );

  return !render ? renderDom : render(data, buttonList, renderDom);
}

ButtonList.defaultProps = {
  type: 'button',
  buttons: [],
};

export default ButtonList;
