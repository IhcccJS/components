import React from 'react';
import { useUnmountedRef } from 'ahooks';
import { isArray, isFunction, getBase64, uuid } from '@ihccc/utils';
import FileSelect from './file-select';
import ImgCrop from './img-crop';
import { multipleUpload, uploadEmiter } from './methods';
import * as Trigger from './trigger';
import PreviewList from './preview/list';
import PreviewNormal from './preview/normal';
import PreviewPlus from './preview/plus';
import UploadStatus from './preview/upload-status';
import UploadFile from './upload-file';
import useStyles from './style';

const Upload = React.forwardRef(function Upload(props, ref) {
  const {
    crop,
    size,
    max,
    value,
    multiple,
    disabled,
    removeAble,
    onChange,
    preview,
    render,
    children,
    className,
    style,
    ...restProps
  } = props;
  const { styles, cx } = useStyles();
  const unmountedRef = useUnmountedRef();
  const [fileList, setFileList] = React.useState([]);
  const isSingle = max === 1 && !isArray(value);

  const did = React.useMemo(() => uuid(), []);

  const handleChange = React.useCallback(
    (values, type) => {
      isFunction(onChange) &&
        onChange.apply(null, crop ? [values, type] : [values]);
    },
    [onChange],
  );

  const handleRemove = React.useCallback(
    (index) => {
      if (isSingle) {
        handleChange(undefined, 'remove');
      } else {
        const newList = [...fileList];
        newList.splice(index, 1);
        handleChange(newList, 'remove');
      }
    },
    [handleChange, isSingle, fileList],
  );

  const handleSelect = React.useCallback(
    (newFileList) => {
      if (isSingle) {
        handleChange(new UploadFile(newFileList[0], did), 'add');
      } else {
        let newList = [...fileList].concat(newFileList);
        if (newList.length > max) newList = newList.slice(-max);
        handleChange(
          newList.map((file) =>
            UploadFile.is(file) ? file : new UploadFile(file, did),
          ),
          'add',
        );
      }
    },
    [handleChange, fileList, max],
  );

  const updateFile = React.useCallback(
    (file) => {
      const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
      if (fileIndex > -1) {
        const newFileList = [...fileList];
        newFileList.splice(fileIndex, 1, file);
        setFileList(newFileList);
      }
    },
    [fileList],
  );

  React.useEffect(() => {
    if (!unmountedRef.current) {
      uploadEmiter.on('upload-' + did, updateFile);
    }
    return () => uploadEmiter.off('upload-' + did);
  }, [updateFile]);

  React.useEffect(() => {
    if (unmountedRef.current) return;
    if (isSingle) {
      setFileList(UploadFile.is(value) ? [value] : []);
      return;
    } else if (isArray(value)) {
      setFileList(value.filter(UploadFile.is));
      return;
    }
    setFileList([]);
  }, [isSingle, value]);

  const inLimit =
    (isSingle && !fileList) || (isArray(fileList) && fileList.length < max);

  return (
    <div className={cx(styles['bc-upload'], className)} style={style}>
      <PreviewList
        disabled={disabled}
        preview={preview}
        render={render}
        fileList={fileList}
        onRemove={handleRemove}
      />
      {inLimit && (
        <FileSelect
          ref={ref}
          {...restProps}
          disabled={disabled}
          multiple={!isSingle && multiple}
          onChange={handleSelect}
        >
          {React.cloneElement(children, { size })}
        </FileSelect>
      )}
    </div>
  );
});

Upload.File = UploadFile;
Upload.ImgCrop = ImgCrop;
Upload.multipleUpload = multipleUpload;
Upload.toBase64 = getBase64;
Upload.Preview = {
  Normal: PreviewNormal,
  Plus: PreviewPlus,
  Status: UploadStatus,
};

Upload.Trigger = {
  Normal: Trigger.Normal,
  Plus: Trigger.Plus,
};

Upload.defaultProps = {
  size: 'middle',
  max: 9,
  multiple: false,
  removeAble: true,
  preview: <PreviewNormal />,
  render: undefined,
  children: <Trigger.Normal />,
};

export default Upload;
