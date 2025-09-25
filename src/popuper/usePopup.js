import React from 'react';
import { PopupContext, ContentContext } from './context';

function usePopup(opts) {
  const { props } = React.useRef(opts || {}).current;
  const popupCtx = React.useContext(PopupContext);

  if (!popupCtx.enable) return {};

  const contentCtx = React.useContext(ContentContext);

  const key = contentCtx.repeatKey || contentCtx.key;

  React.useEffect(() => {
    popupCtx.setProps(key, props);
  }, []);

  return {
    name: contentCtx.name,
    open: (...args) => popupCtx.open(...(args.length === 0 ? [key] : args)),
    hide: (...args) => popupCtx.hide(...(args.length === 0 ? [key] : args)),
    close: (...args) => popupCtx.close(...(args.length === 0 ? [key] : args)),
    destroy: (...args) => popupCtx.destroy(...(args.length === 0 ? [key] : args)),
    setProps: (...args) => popupCtx.setData(...(args.length < 2 ? [key, args[0]] : args)),
  };
}

export default usePopup;
