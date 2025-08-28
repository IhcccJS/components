import React from 'react';
import { Image } from 'antd';
import { ImageContext } from './context';

let __GROUP_ID__ = 20000;

function ImagePreview({ defaultReader, readerOption, children }) {
  const imagesRef = React.useRef({});
  const [current, setCurrent] = React.useState();

  const register = React.useCallback((group, src) => {
    group = group || __GROUP_ID__++;
    if (!imagesRef.current[group]) imagesRef.current[group] = [];
    let index = imagesRef.current[group].indexOf(src);
    // FIXME 会不会存在插入相同地址图片时，顺序错误的情况？？
    if (index === -1) {
      index = imagesRef.current[group].length;
      imagesRef.current[group].push(src);
    }

    const remove = () => {
      if (!imagesRef.current[group]) return;
      imagesRef.current[group].splice(index, 1);
      if (imagesRef.current[group].length === 0) {
        delete imagesRef.current[group];
      }
    };

    return { index, group, remove };
  }, []);

  const open = React.useCallback((group, index = 0) => {
    setCurrent({ group, index });
  }, []);

  const go = React.useCallback((index) => {
    setCurrent((current) => ({ ...current, index }));
  }, []);

  return (
    <ImageContext.Provider value={{ enable: true, defaultReader, readerOption, register, open, go }}>
      {children}
      <Image.PreviewGroup
        items={imagesRef.current[current?.group || ''] || []}
        preview={{
          current: current?.index || 0,
          visible: !!current,
          onVisibleChange: () => setCurrent(),
          onChange: go,
        }}
      />
    </ImageContext.Provider>
  );
}

export default ImagePreview;
