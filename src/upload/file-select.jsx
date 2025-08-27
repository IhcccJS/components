import React from 'react';
import clsx from 'clsx';
import { attrAccept, traverseFileTree } from './methods';
import { uuid } from '@ihccc/utils';
// import useStyles from './style/file-select';

const FileSelect = React.forwardRef(function (props, ref) {
  const {
    className,
    size,
    disabled,
    transferEvent,
    accept,
    directory,
    multiple = false,
    capture,
    openFileDialogOnClick = true,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onChange,
    children,
    style,
    ...restProps
  } = props;
  // const { styles, cx } = useStyles();
  const [key, setKey] = React.useState(uuid('bc'));
  const inputRef = React.useRef(ref);

  const reset = React.useCallback(() => {
    setKey(uuid('bc'));
  }, []);

  const onElementClick = React.useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    if (children && children.type === 'button') {
      const parent = el.parentNode;
      parent.focus();
      parent.querySelector('button').blur();
    }
    el.click();
    if (onClick) onClick(e);
  }, []);

  const onKeyDown = React.useCallback(
    (e) => {
      if (e.key === 'Enter') onElementClick(e);
    },
    [onElementClick],
  );

  const onFileDrop = React.useCallback(
    (e) => {
      e.preventDefault();

      if (e.type === 'dragover') return;

      if (directory) {
        traverseFileTree(Array.prototype.slice.call(e.dataTransfer.items), onChange, (file) => attrAccept(file, accept));
      } else {
        let files = [...e.dataTransfer.files].filter((file) => attrAccept(file, accept));

        if (multiple === false) {
          files = files.slice(0, 1);
        }

        onChange(files);
      }
    },
    [onChange],
  );

  const onInputChange = React.useCallback(
    (e) => {
      const { files } = e.target;
      const acceptedFiles = [...files].filter((file) => !directory || attrAccept(file, accept));

      onChange(acceptedFiles);
      reset();
    },
    [onChange],
  );

  const cssName = clsx('bc-file-select', {
    ['bc-file-select-disabled']: disabled,
    [className]: className,
  });

  const dirProps = directory ? { directory: 'directory', webkitdirectory: 'webkitdirectory' } : {};

  const events = disabled
    ? {}
    : {
        onClick: openFileDialogOnClick ? onElementClick : () => {},
        onKeyDown: openFileDialogOnClick ? onKeyDown : () => {},
        onMouseEnter,
        onMouseLeave,
        onDrop: onFileDrop,
        onDragOver: onFileDrop,
        tabIndex: '0',
      };

  return (
    <div className={cssName} style={style} {...(transferEvent ? {} : events)}>
      <input
        {...restProps}
        ref={inputRef}
        type="file"
        onClick={(e) => e.stopPropagation()}
        onChange={onInputChange}
        style={{ display: 'none' }}
        accept={accept}
        multiple={multiple}
        {...dirProps}
        {...(capture != null ? { capture } : {})}
        key={key}
      />
      {React.isValidElement(children)
        ? React.cloneElement(children, { size, disabled, events: transferEvent ? events : {}, onChange })
        : children}
    </div>
  );
});

export default FileSelect;
