import React from 'react';
import clsx from 'clsx';
import { Tooltip, Dropdown } from 'antd';
import { isArray, isObject, isFunction, joinString } from '@ihccc/utils';
import Access from '../access';
import { buttonSetter } from '../setter';
import { Confirm } from './buttons';
import Space from './space';
import { handleButtonConfig } from './utils';

function RenderButtons(props) {
  const { blockName, type, space, inline, wrap, reverse, layout, buttons, baseProps, renderType, eventData, eventMap, style } = props;
  const spaceTypeRef = React.useRef();

  const lastIndex = buttons.length - 1;

  const eventFunction = React.useCallback(
    (item, name) => {
      let event = isFunction(item[name]) ? item[name] : eventMap[item[name] || item.key];
      if (isFunction(event)) return event?.bind(item, eventData);
      return null;
    },
    [eventMap, eventData],
  );

  const handleDropdownMenu = React.useCallback(
    (buttons) => {
      const items = buttons.map((btn) => {
        return {
          ...btn.props,
          key: btn.key,
        };
      });

      const onClick = (item) => {
        for (let index = 0; index < buttons.length; index++) {
          if (buttons[index].key === item.key) {
            eventFunction(item, 'onClick')?.(item);
            return;
          }
        }
      };
      return { items, onClick };
    },
    [eventFunction],
  );

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
          eventData={eventData}
          eventMap={eventMap}
          key={group.key}
        />
      );
    }

    const btnType = item.type || type || 'a';

    const buttonType = buttonSetter.get(btnType);

    if (!buttonType) throw new Error('unknow button type:' + btnType);

    const eventName = buttonType.event || 'event';

    let button;

    const buttonProps = {
      ...baseProps?.[btnType],
      // ? 需求是什么
      ...(!item.props ? eventData : item.props),
      ...(!!item.dropdown || !!item.confirm || !!item.onConfirm
        ? {}
        : {
            [eventName]: eventFunction(item, eventName),
          }),
      id: joinString('_')('button', blockName, item.key),
    };

    if (!!item.props) {
      button = React.createElement(buttonType.component, buttonProps);
    }

    if (!!item.render) {
      button = item.render(eventData, buttonProps, button);
    }

    if (!!item.dropdown) {
      button = (
        <Dropdown {...baseProps?.dropdown} {...item.props} menu={handleDropdownMenu(item.items)}>
          {button}
        </Dropdown>
      );
    } else if (!!item.confirm || !!item.onConfirm) {
      button = (
        <Confirm {...baseProps?.confirm} {...item.confirm} onConfirm={eventFunction(item, 'onConfirm')}>
          {button}
        </Confirm>
      );
    }

    if (!!item.tip) {
      button = (
        <Tooltip {...baseProps?.tip} {...(isObject(item.tip) ? item.tip : { title: item.tip })}>
          {button}
        </Tooltip>
      );
    }

    spaceTypeRef.current = item.space || space || (btnType === 'a' ? 'divider' : 'empty');

    return (
      <React.Fragment key={item.key}>
        {button}
        {((!renderType && index !== lastIndex) || (renderType === 'dropdown' && !item.group)) && space !== 'none' && (
          <Space type={spaceTypeRef.current} />
        )}
      </React.Fragment>
    );
  });

  if (renderType === 'dropdown') return renderbuttons;

  return (
    <React.Fragment>
      <div
        className={clsx('bc-action-buttons', layout && 'bc-action-buttons-layout-' + layout, {
          ['bc-action-buttons-group']: !!renderType,
          ['bc-action-buttons-inline']: !!inline,
          ['bc-action-buttons-wrap']: !!wrap,
          ['bc-action-buttons-reverse']: !!reverse,
        })}
        style={style}
      >
        {renderbuttons}
      </div>
      {renderType && spaceTypeRef.current !== 'none' && <Space type={spaceTypeRef.current} />}
    </React.Fragment>
  );
}

function ButtonList(props) {
  const {
    access,
    type = 'button',
    space,
    inline,
    wrap,
    reverse,
    layout,
    data,
    buttons = [],
    baseProps,
    sortRenderKeys,
    render,
    eventMap,
    style,
  } = props;

  if ((buttons || []).length === 0) return null;

  const accessHandle = Access.useAccess(
    Object.assign(
      {
        data: buttons,
        handler: 'buttonList',
      },
      isObject(access) ? access : { name: access },
    ),
  );

  const buttonList = React.useMemo(() => {
    const accessButtons = accessHandle?.passedData || [];
    const sortIndex = accessButtons
      .map((item, index) => {
        let sort = item.sort || index;
        if (isArray(sortRenderKeys)) {
          sort = sortRenderKeys.indexOf(item.key);
        } else if (isObject(sortRenderKeys) && sortRenderKeys[item.key] !== void 0) {
          sort = sortRenderKeys[item.key];
        }
        if (!sort && sort !== 0) return null;
        return { index, sort };
      })
      .filter(Boolean);
    sortIndex.sort((x, y) => x.sort - y.sort);
    const sortedButtons = sortIndex.map((item) => accessButtons[item.index]);
    return handleButtonConfig(sortedButtons, data, type);
  }, [accessHandle?.passedData, data]);

  const renderDom = (
    <RenderButtons
      blockName={access?.name || access || ''}
      type={type}
      space={space}
      inline={inline}
      wrap={wrap}
      reverse={reverse}
      layout={layout}
      buttons={buttonList}
      baseProps={baseProps}
      eventData={data}
      eventMap={eventMap || {}}
      style={style}
    />
  );

  return !render ? renderDom : render(renderDom, data, buttonList);
}

ButtonList.button = buttonSetter;

export default ButtonList;
