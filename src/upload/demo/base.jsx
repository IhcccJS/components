import React from 'react';
import { Space, Button, message } from 'antd';
import { Upload } from '@ihccc/components';

function Demo() {
  const [value, setValue] = React.useState([]);

  const handleUpload = async () => {
    const hide = message.loading('上传中...', 0);
    const res = await Upload.multipleUpload('http://localhost:5000/base/files/upload', value, {
      // format: res => res.data
    });
    hide();
    console.log('结果：', res);
  };

  console.log('value：', value);

  return (
    <Space direction="vertical">
      <Upload multiple value={value} onChange={setValue} />
      <Button onClick={handleUpload}>开始上传</Button>
    </Space>
  );
}

export default Demo;
