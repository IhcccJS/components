import React from 'react';
import { ImageContext } from './context';

function usePreview(src, option) {
  const { group, reader } = option || {};
  const { enable, defaultReader, readerOption, register, open, go } = React.useContext(ImageContext);
  const unRef = React.useRef({});

  const preview = React.useCallback(() => {
    if (!enable) return;
    const { group, index } = unRef.current;
    open(group, index);
  }, []);

  const previewSrc = React.useMemo(() => {
    if (!enable) return src;
    const imgReader = (readerOption || {})[reader || defaultReader] || reader;
    return !!imgReader && !!imgReader.preview ? imgReader.preview(src) : src;
  }, [reader, src]);

  React.useEffect(() => {
    if (!enable) return;
    unRef.current.remove?.();
    unRef.current = register(group, previewSrc);
    return () => {
      unRef.current.remove?.();
    };
  }, [previewSrc]);

  return { previewSrc, open: preview, go };
}

export default usePreview;
