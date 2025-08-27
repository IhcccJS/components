import React from 'react';
import { FileUnknownOutlined } from '@ant-design/icons';
import Image from '../../image';
import { isFunction } from '@ihccc/utils';
// import { defaultFallback } from '../../image-list';

const ShowImage = ({ file, fallback }) => {
  const [src, setSrc] = React.useState('');

  React.useEffect(() => {
    file.getSrc(setSrc);
  }, []);

  return file.isImage && src ? (
    // <Image src={src} fallback={fallback || defaultFallback} alt="image" />
    <Image src={src} fallback={fallback} alt="image" width="100%" />
  ) : (
    <FileUnknownOutlined style={{ fontSize: 42, color: '#c9c9c9' }} />
  );
};

const PreviewList = ({ disabled, preview, render, fileList, removeAble, onRemove }) => {
  return (fileList || []).map((file, index) => {
    const renderElement = isFunction(render) && render(file);

    return React.cloneElement(
      preview,
      {
        disabled,
        file,
        removeAble,
        onRemove: () => onRemove(index),
        key: file.uid,
      },
      renderElement || <ShowImage file={file} />,
    );
  });
};

export default PreviewList;
