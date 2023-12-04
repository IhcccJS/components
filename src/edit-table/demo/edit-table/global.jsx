import React from 'react';
import { Avatar, Tooltip, Checkbox } from 'antd';
import { setOptions, register, Upload } from '@ihccc/components';

setOptions({
  'front.width': [
    { label: 'min', value: '50' },
    { label: 'xs', value: '60' },
    { label: 'sm', value: '80' },
    { label: 'md', value: '120' },
    { label: 'lg', value: '180' },
    { label: 'xl', value: '260' },
    { label: 'xxl', value: '360' },
    { label: 'max', value: '480' },
  ],
  'generator.input_type': [
    { label: 'input', value: 'input' },
    { label: 'select', value: 'select' },
    { label: 'checkbox', value: 'checkbox' },
    { label: 'radio', value: 'radio' },
    { label: 'number', value: 'number' },
    { label: 'date', value: 'date' },
  ],
});

// 绑定表单元素
register.form(
  {
    check: Checkbox,
    upload: (props) => (
      <Upload {...props}>
        <a>选择文件</a>
      </Upload>
    ),
  },
  {
    input: { placeholder: '请输入', size: 'small' },
    select: { placeholder: '请选择', size: 'small' },
    autoComplete: {
      placeholder: '请输入或选择',
      size: 'small',
      style: { width: '100%' },
    },
  },
);

// 绑定渲染方法
register.render({
  boolean: (val) => (val === true && '✔️') || (val === false && '❌'),
  pics: (val) => {
    if (!val || val?.length === 0) return '-';
    return (
      <Avatar.Group maxCount={2}>
        {val.map((file) => (
          <Tooltip title={file.name} key={file.uid}>
            <Avatar src={file.src}>{file.name}</Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    );
  },
});
