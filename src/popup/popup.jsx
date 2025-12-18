import React from 'react';
import { createPortal } from 'react-dom';
import { MinusOutlined, CloseOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import ButtonList from '../button-list';

// TODO 弹窗打开关闭需要模拟 antd 效果，但是缩放原点对不上打开触发位置
// function getScroll(w, top) {
//   var ret = w['page'.concat(top ? 'Y' : 'X', 'Offset')];
//   var method = 'scroll'.concat(top ? 'Top' : 'Left');
//   if (typeof ret !== 'number') {
//     var d = w.document;
//     ret = d.documentElement[method];
//     if (typeof ret !== 'number') {
//       ret = d.body[method];
//     }
//   }
//   return ret;
// }

// export function offset(el) {
//   var rect = el.getBoundingClientRect();
//   var pos = {
//     left: rect.left,
//     top: rect.top,
//   };
//   var doc = el.ownerDocument;
//   var w = doc.defaultView || doc.parentWindow;
//   pos.left += getScroll(w);
//   pos.top += getScroll(w, true);
//   return pos;
// }
// let mousePosition;
// const getClickPosition = (e) => {
//   mousePosition = {
//     x: e.pageX,
//     y: e.pageY,
//   };
//   // 100ms 内发生过点击事件，则从点击位置动画展示
//   // 否则直接 zoom 展示
//   // 这样可以兼容非点击方式展开
//   setTimeout(() => {
//     mousePosition = null;
//   }, 100);
// };
// // 只有点击事件支持从鼠标位置动画展开
// if (!!document.documentElement) {
//   document.documentElement.addEventListener('click', getClickPosition, true);
// }

const internalExtraButtons = [
  { key: 'hide', props: { type: 'text', icon: <MinusOutlined /> }, hidden: ({ onHide }) => !onHide },
  { key: 'cancel', props: { type: 'text', icon: <CloseOutlined /> }, hidden: ({ onCancel }) => !onCancel },
];

const extraEventMap = {
  hide: ({ onHide }) => onHide?.(),
  cancel: ({ onCancel }) => onCancel?.(),
};

const interalFooterButtons = [
  { key: 'cancel', props: { children: '取消' }, hidden: ({ onCancel }) => !onCancel },
  { key: 'ok', props: { type: 'primary', children: '确认' }, hidden: ({ onOk }) => !onOk },
];

const footerEventMap = {
  cancel: ({ onCancel }) => onCancel?.(),
  ok: ({ onOk }) => onOk?.(),
};

function Popup(props, ref) {
  const {
    id,
    open,
    top = 100,
    width = 520,
    zIndex,
    title,
    extra,
    header,
    extraButton = {},
    footer,
    footerButton = {},
    children,
    mask,
    cancelMask,
    maskClosable = true,
    forceRender,
    destroyOnClose,
    classNames = {},
    styles = {},
    afterClose,
    popupRef,
    popupRender,
    onHide,
    onCancel,
    onOk,
    onPopupClick,
  } = props;

  const [openAsync, setOpenAsync] = React.useState(false);
  // const [originPosition, setOriginPosition] = React.useState('');
  const initRenderRef = React.useRef(false);
  const thisPopupRef = React.useRef(null);

  const onTransitionEnd = (e) => {
    if (e.target === thisPopupRef.current && !open) {
      setOpenAsync(false);
      afterClose?.();
    }
  };

  React.useEffect(() => {
    if (open) setOpenAsync(true);
    // if (!thisPopupRef.current) return;
    // const elementOffset = offset(thisPopupRef.current);
    // console.log(mousePosition);
    // if (!mousePosition) return;
    // setOriginPosition(`${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`);
  }, [open]);

  // console.log(extraButton);

  if (!open && !openAsync) {
    if (!forceRender && !initRenderRef.current) return null;
    if (destroyOnClose) return null;
  } else {
    initRenderRef.current = true;
  }

  const buttonsData = { onHide, onCancel, onOk };

  const headerNode =
    header === false || header === null
      ? null
      : header || (
          <div className="bc-popup-header-default">
            <div className={clsx('bc-popup-header-title', classNames.title)}>{title}</div>
            <div className="bc-popup-header-buttons">
              {extra}
              <ButtonList
                space="none"
                {...extraButton}
                buttons={[...(extraButton.buttons || []), ...internalExtraButtons]}
                eventData={{ ...buttonsData, ...extraButton.eventData }}
                eventMap={{ ...extraEventMap, ...extraButton.eventMap }}
              />
            </div>
          </div>
        );

  const footerNode =
    footer === false || footer === null
      ? null
      : footer || (
          <div className="bc-popup-footer-default">
            <ButtonList
              layout="end"
              {...footerButton}
              buttons={[...(footerButton.buttons || []), ...interalFooterButtons]}
              eventData={{ ...buttonsData, ...footerButton.eventData }}
              eventMap={{ ...footerEventMap, ...footerButton.eventMap }}
            />
          </div>
        );

  const popupNode = (
    <div ref={popupRef} className={clsx('bc-popup-content', classNames.content)} onClick={onPopupClick}>
      {headerNode && (
        <div className="bc-popup-header" style={styles.header}>
          {headerNode}
        </div>
      )}
      <div className="bc-popup-body" style={styles.body}>
        {children}
      </div>
      {footerNode && (
        <div className="bc-popup-footer" style={styles.footer}>
          {footerNode}
        </div>
      )}
    </div>
  );

  const wrapperProps = { className: 'bc-popup-main-wrapper', style: { top, width, zIndex } };

  const popupDom = (
    <div
      ref={thisPopupRef}
      className={clsx('bc-popup-main', classNames.main, !popupRender ? wrapperProps.className : '')}
      style={{ ...styles.main, ...(!popupRender ? wrapperProps.style : {}) /** , transformOrigin: originPosition */ }}
      onTransitionEnd={onTransitionEnd}
    >
      {popupNode}
    </div>
  );

  return createPortal(
    <div
      id={id}
      ref={ref}
      className={clsx('bc-popup-root', open && openAsync && 'bc-popup-open', cancelMask && 'bc-popup-mask-event', classNames.root)}
      style={open || openAsync ? { ...styles.root, zIndex } : { ...styles.root, display: 'none' }}
    >
      {mask !== false && mask !== null && (
        <div className="bc-popup-mask" style={styles.mask} {...(maskClosable ? { onClick: onCancel || onHide } : {})}></div>
      )}
      {popupRender?.(popupDom, wrapperProps) || popupDom}
    </div>,
    document.body,
  );
}

export default React.forwardRef(Popup);
