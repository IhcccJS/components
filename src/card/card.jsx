import React from 'react';
import clsx from 'clsx';
import { Tabs } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';

export const Base = React.forwardRef(function Base(props, ref) {
  const { size, children, className, style, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={clsx('bc-card', className, {
        ['bc-card-size-' + size]: !!size,
      })}
      style={style}
      {...restProps}
    >
      {children}
    </div>
  );
});

export function Header(props) {
  const { statusType, icon, title, extra, className, titleClassName, style, ...restProps } = props;
  if (!title && !extra) return;
  return (
    <div className={clsx('bc-card-header', className)} style={style} {...restProps}>
      <div
        className={clsx('bc-card-title', titleClassName, {
          ['bc-card-title-' + statusType]: !!statusType,
        })}
      >
        {icon && <span className="bc-card-title-icon">{icon}</span>}
        {title}
      </div>
      {extra && <div className={'bc-card-extra'}>{extra}</div>}
    </div>
  );
}

export function Cover(props) {
  const { children, className, style, ...restProps } = props;
  if (!children) return;
  return (
    <div className={clsx('bc-card-cover', className)} style={style} {...restProps}>
      {children}
    </div>
  );
}

export function Body(props) {
  const { children, className, style, restProps } = props;
  if (!children) return;
  return (
    <div className={clsx('bc-card-body', className)} style={style} {...restProps}>
      {children}
    </div>
  );
}

export function Footer(props) {
  const { children, className, style, restProps } = props;
  if (!children) return;
  return (
    <div className={clsx('bc-card-footer', className)} style={style} {...restProps}>
      {children}
    </div>
  );
}

const Card = React.forwardRef(function Card(props, ref) {
  const {
    icon,
    title,
    extra,
    cover,
    footer,
    size,
    statusType,
    tabs,
    children,
    className,
    classNames = {},
    style,
    styles = {},
    onClick,
  } = props;

  // 处理卡片 tabs
  const tabNode = React.useMemo(() => {
    if (!tabs) return {};

    const { content, items } = (tabs.items || []).reduce(
      (store, { children, ...item }) => {
        store.content[item.key] = children;
        store.items.push(item);
        return store;
      },
      { content: {}, items: [] },
    );

    return {
      tabs: <Tabs {...tabs} items={items} />,
      // FIXME: 修复在 tabs 是非受控状态下，内容不显示的问题
      children: content[tabs.activeKey],
    };
  }, [tabs]);

  // 处理卡片折叠
  const foldAble = 'defaultFold' in props || 'fold' in props;

  const [foldValue, setFoldValue] = useControllableValue(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultFold',
    valuePropName: 'fold',
    trigger: 'onFoldChange',
  });

  const extraNode = React.useMemo(() => {
    let _extra = extra;
    if (foldAble) {
      const defaultFoldButton = (
        <div className="bc-card-extra-fold" onClick={() => setFoldValue(!foldValue)}>
          <DownOutlined rotate={foldValue ? 0 : 180} />
        </div>
      );
      if (typeof _extra === 'function') {
        _extra = _extra(foldValue, setFoldValue, defaultFoldButton);
      } else {
        _extra = (
          <React.Fragment>
            {extra}
            {defaultFoldButton}
          </React.Fragment>
        );
      }
    }
    return _extra;
  }, [foldValue, foldAble, extra]);

  return (
    <Base ref={ref} className={clsx(className, classNames.root)} style={style || styles.root || styles.card} size={size} onClick={onClick}>
      <Header
        statusType={statusType}
        icon={icon}
        title={tabNode.tabs || title}
        extra={extraNode}
        titleClassName={!tabNode.tabs ? '' : 'bc-card-title-tabs'}
        className={classNames.header}
        style={styles.header}
      />
      <Cover className={classNames.cover} style={styles.cover}>
        {cover}
      </Cover>
      <Body className={classNames.body} style={styles.body}>
        {foldValue ? null : tabNode.children || children}
      </Body>
      <Footer className={classNames.footer} style={styles.footer}>
        {footer}
      </Footer>
    </Base>
  );
});

export default Card;
