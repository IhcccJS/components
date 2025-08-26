import React from 'react';
import { ModalContext, ContentContext } from './context';

function useModal(opts) {
  const { props } = React.useRef(opts || {}).current;
  const modalCtx = React.useContext(ModalContext);

  if (!modalCtx.enable) return {};

  const contentCtx = React.useContext(ContentContext);

  const key = contentCtx.repeatKey || contentCtx.key;

  React.useEffect(() => {
    modalCtx.setProps(key, props);
  }, []);

  return {
    name: contentCtx.name,
    open: (...args) => modalCtx.open(...(args.length === 0 ? [key] : args)),
    hide: (...args) => modalCtx.hide(...(args.length === 0 ? [key] : args)),
    close: (...args) => modalCtx.close(...(args.length === 0 ? [key] : args)),
    destroy: (...args) => modalCtx.destroy(...(args.length === 0 ? [key] : args)),
    setProps: (...args) => modalCtx.setData(...(args.length < 2 ? [key, args[0]] : args)),
  };
}

export default useModal;
