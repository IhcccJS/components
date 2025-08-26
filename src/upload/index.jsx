import React from 'react';
import { useUnmountedRef, useControllableValue } from 'ahooks';
import clsx from 'clsx';
import { isArray, getBase64, uuid } from '@wowon/utils';
import FileSelect from './file-select';
// import ImgCrop from './img-crop';
import { multipleUpload, uploadEmiter } from './methods';
import PreviewList from './preview/list';
import * as Normal from './render/normal';
import * as Plus from './render/plus';
import * as Text from './render/text';
import UploadFile from './upload-file';
// import useStyles from './style';
import './style/file-select.less';
import './style/index.less';
import './style/preview.less';
import './style/trigger.less';

const Upload = React.forwardRef(function Upload(props, ref) {
  const {
    crop,
    size = 'middle',
    max = 9,
    transferEvent,
    disabled,
    addAble = true,
    removeAble = true,
    preview = <Normal.Preview />,
    render,
    children = <Normal.Trigger />,
    className,
    style,
    selectStyle,
    value: fv,
    onChange,
    ...restProps
  } = props;
  // const { styles, cx } = useStyles();
  const unmountedRef = useUnmountedRef();
  const [value, setValue] = useControllableValue(props, {
    defaultValue: [],
  });

  const did = React.useMemo(() => uuid(), []);

  const handleChange = React.useCallback((values, type) => {
    setValue(...(crop ? [values, type] : [values]));
  }, []);

  const handleRemove = React.useCallback(
    (index) => {
      const newList = [...(value || [])];
      newList.splice(index, 1);
      handleChange(newList, 'remove');
    },
    [value, handleChange],
  );

  const handleSelect = React.useCallback(
    (newFileList) => {
      let newList = [...(value || [])].concat(newFileList);
      if (newList.length > max) newList = newList.slice(-max);
      handleChange(
        newList.map((file) => (UploadFile.is(file) ? file : new UploadFile(file, did))),
        'add',
      );
    },
    [value, handleChange, max],
  );

  const updateFile = React.useCallback(
    (file) => {
      const fileIndex = (value || []).findIndex((item) => item.uid === file.uid);
      if (fileIndex > -1) {
        const newFileList = [...value];
        newFileList.splice(fileIndex, 1, file);
        onChange(newFileList);
      }
    },
    [value],
  );

  React.useEffect(() => {
    if (!unmountedRef.current) {
      uploadEmiter.on('upload-' + did, updateFile);
    }
    return () => uploadEmiter.off('upload-' + did);
  }, [updateFile]);

  const inLimit = !value || (isArray(value) && value.length < max);

  return (
    <div className={clsx('bc-upload', className)} style={style}>
      <PreviewList
        disabled={disabled}
        preview={preview}
        render={render}
        fileList={value}
        removeAble={removeAble}
        onRemove={handleRemove}
      />
      {inLimit && addAble && (
        <FileSelect
          ref={ref}
          {...restProps}
          transferEvent={transferEvent}
          size={size}
          disabled={disabled}
          onChange={handleSelect}
          style={selectStyle}
        >
          {children}
        </FileSelect>
      )}
    </div>
  );
});

Upload.File = UploadFile;
// Upload.ImgCrop = ImgCrop;
Upload.multipleUpload = multipleUpload;
Upload.toBase64 = getBase64;
Upload.Normal = Normal;
Upload.Plus = Plus;
Upload.Text = Text;

export default Upload;
