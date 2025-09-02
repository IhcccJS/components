import React from 'react';
import ImageList from '../../image/list';

function imageRender(props = {}) {
  const { format, ...restProps } = props;

  return function render(val) {
    const images = format?.(val) || val;
    if (!Array.isArray(images)) return '图片列表转换成数组才能渲染！';
    return <ImageList items={images} gap={8} column={2} {...restProps} />;
  };
}

export default imageRender;
