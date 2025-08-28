import React from 'react';
import clsx from 'clsx';
import { isString } from '@ihccc/utils';
import UploadFile from '../upload/upload-file';
import usePreview from './usePreview';

function Image({ border, src, size = 'default', group, reader, className, children, onClick, ...restProps }) {
  const { previewSrc, open } = usePreview(src, { group, reader });

  const onImageClick = (e) => {
    e.stopPropagation();
    restProps.onClick?.(e);
    open();
  };

  if (!!children) {
    if (isString(children)) return <a onClick={onImageClick}>{children}</a>;
    return React.cloneElement(children, { onClick: onImageClick });
  }

  if (!border) return <img className={clsx('bc-image', className)} src={previewSrc} {...restProps} onClick={onImageClick} />;

  return (
    <div className={clsx(className, 'bc-image-border', { ['bc-image-size-' + size]: !!size })} onClick={onImageClick}>
      <img className="bc-image" src={previewSrc} {...restProps} />
    </div>
  );
}

function SupportUploadFileImage({ src, ...props }) {
  const imageSrc = React.useMemo(() => {
    const [file] = Array.isArray(src) ? src : [src];
    return UploadFile.is(file) ? file.src : file;
  }, [src]);

  return <Image {...props} src={imageSrc} />;
}

export default SupportUploadFileImage;
