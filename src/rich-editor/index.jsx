import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modaler from '@/components/@comp/modaler';
import { uploadRead } from '@/utils/file-read';
import './index.less';

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
  const quillRef = React.useRef(null);

  const modal = Modaler.useModal();

  const modules = React.useMemo(() => {
    const image = () => {
      const onSuccess = (files) => {
        const quill = quillRef.current.getEditor();
        files.forEach((file) => {
          const range = quill.getSelection();
          quill.insertEmbed(range?.index || 0, 'image', uploadRead.preview(file.source.url));
        });
      };
      modal.open('global/sys-upload', { onSuccess });
    };
    return {
      toolbar: { ...toolbar, handlers: { image } },
    };
  }, []);

  return <ReactQuill ref={quillRef} modules={modules} formats={formats} {...props} className="rich-editor" />;
}

export default React.forwardRef(RichEditor);
