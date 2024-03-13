import React from 'react';
import { ModalContext, ContentContext } from './context';

function useModal(opts) {
  const { props } = React.useRef(opts || {}).current;
  const modalCtx = React.useContext(ModalContext);

  if (!modalCtx.enable) return {};

  const contentCtx = React.useContext(ContentContext);

  React.useEffect(() => {
    modalCtx.setProps(contentCtx.key, props);
  }, []);

  return {
    name: contentCtx.name,
    open: () => modalCtx.open(contentCtx.key),
    hide: () => modalCtx.hide(contentCtx.key),
    close: () => modalCtx.close(contentCtx.key),
    destroy: () => modalCtx.destroy(contentCtx.key),
    setProps: (props) => modalCtx.setData(contentCtx.key, props),
  };
}

export default useModal;
