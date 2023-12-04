import React from 'react';
import { isObject, isString, getBase64 } from '@ihccc/utils';

function usePreviewFile(file) {
  const [result, setResult] = React.useState({});

  React.useEffect(() => {
    if (isString(file)) {
      setResult({ type: 'string', src: file, source: file });
      return;
    }

    let currentFile;

    if (file instanceof File) currentFile = file;

    if (isObject(file) && file.originFileObj instanceof File)
      currentFile = file.originFileObj;

    if (!!currentFile && /^image\/.+/.test(currentFile.type)) {
      getBase64(currentFile).then((src) => {
        setResult({ type: 'image', src, source: file });
      });
      return;
    }

    setResult({ type: file.type || 'unknow', src: file, source: file });
  }, [file]);

  return result;
}

export default usePreviewFile;
