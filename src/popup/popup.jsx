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
  { key: 'hide', props: { type: 'text', icon: <MinusOutlined /> } },
  { key: 'cancel', props: { type: 'text', icon: <CloseOutlined /> } },
];

const extraEventMap = {
  hide: ({ onHide }) => onHide?.(),
  cancel: ({ onCancel }) => onCancel?.(),
};

const interalFooterButtons = [
  { key: 'cancel', props: { children: '取消' } },
  { key: 'ok', props: { type: 'primary', children: '确认' } },
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
  const thisPopupRef = React.useRef(null);

  const onTransitionEnd = (e) => {
    if (e.target === thisPopupRef.current && !open) {
      setOpenAsync(false);
      afterClose?.();
    }
  };

  React.useEffect(() => {
    if (open) setOpenAsync(true);
    // const elementOffset = offset(thisPopupRef.current);
    // console.log(mousePosition);
    // if (!mousePosition) return;
    // setOriginPosition(`${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`);
  }, [open]);

  // console.log(extraButton);

  if (!open && !openAsync && destroyOnClose) return null;

  const buttonsData = { ...extraButton.data, onHide, onCancel, onOk };

  const headerNode = header || (
    <div className="bc-popup-header-default">
      <div className={clsx('bc-popup-header-title', classNames.title)}>{title}</div>
      <div className="bc-popup-header-buttons">
        {extra}
        <ButtonList
          space="none"
          buttons={[...(extraButton.buttons || []), ...internalExtraButtons]}
          data={{ ...extraButton.data, ...buttonsData }}
          eventMap={{ ...extraButton.eventMap, ...extraEventMap }}
        />
      </div>
    </div>
  );

  const footerNode = footer || (
    <div className="bc-popup-footer-default">
      <ButtonList
        layout="end"
        buttons={[...(footerButton.buttons || []), ...interalFooterButtons]}
        data={{ ...footerButton.data, ...buttonsData }}
        eventMap={{ ...footerButton.eventMap, ...footerEventMap }}
      />
    </div>
  );

  const popupNode = (
    <div ref={popupRef} className={clsx('bc-popup-content', classNames.content)} onClick={onPopupClick}>
      {header !== false && header !== null && (
        <div className="bc-popup-header" style={styles.header}>
          {headerNode}
        </div>
      )}
      <div className="bc-popup-body" style={styles.body}>
        {children}
      </div>
      {footer !== false && footer !== null && (
        <div className="bc-popup-footer" style={styles.footer}>
          {footerNode}
        </div>
      )}
    </div>
  );

  return createPortal(
    <div
      id={id}
      ref={ref}
      className={clsx('bc-popup-root', open && openAsync && 'bc-popup-open', cancelMask && 'bc-popup-mask-event', classNames.root)}
      style={open || openAsync ? { ...styles.root, zIndex } : { ...styles.root, display: 'none' }}
    >
      {mask !== false && mask !== null && <div className="bc-popup-mask" style={styles.mask} onClick={onCancel}></div>}
      <div
        ref={thisPopupRef}
        className={clsx('bc-popup-main', classNames.main)}
        style={{ ...styles.main, top, width, zIndex /**, transformOrigin: originPosition */ }}
        onTransitionEnd={onTransitionEnd}
      >
        {popupRender?.(popupNode) || popupNode}
      </div>
    </div>,
    document.body,
  );
}

export default React.forwardRef(Popup);
