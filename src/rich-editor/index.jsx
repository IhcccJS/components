import React from 'react';
import ReactQuill from 'react-quill';
import clsx from 'clsx';
import Popuper from '../popuper';

const formats = [
  'header',
  // 'size',
  // 'font',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'bullet',
  'check',
  'script',
  'blockquote',
  'code-block',
  'link',
  'direction',
  'clean',
  'image',
];

const toolbar = {
  container: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    // [{ font: [] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    ['blockquote', 'code-block'],
    ['link', 'image'], // , 'image', 'video', 'formula'
    [{ direction: 'rtl' }], // text direction
    ['clean'], // remove formatting button
  ],
};

function RichEditor(props, ref) {
  const { className, imageFormat, onUploadFile, ...restProps } = props;
  const quillRef = React.useRef(null);

  const popup = Popuper.usePopup();

  const modules = React.useMemo(() => {
    const image = () => {
      const onSuccess = (files) => {
        const quill = quillRef.current.getEditor();
        (files || []).forEach((file) => {
          const range = quill.getSelection();
          quill.insertEmbed(range?.index || 0, 'image', imageFormat?.(file) || '');
        });
      };
      onUploadFile?.({ popup, onSuccess });
    };
    return {
      toolbar: { ...toolbar, handlers: { image } },
    };
  }, []);

  return <ReactQuill ref={quillRef} modules={modules} formats={formats} {...restProps} className={clsx('bc-rich-editor', className)} />;
}

export default React.forwardRef(RichEditor);
