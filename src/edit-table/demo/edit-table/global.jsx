import React from 'react';
import { Avatar, Tooltip, Checkbox } from 'antd';
import { setOptions, register, Upload } from '@ihccc/components';

setOptions({
  'front.width': [
    { label: 'min', value: 'min' },
    { label: 'xs', value: 'xs' },
    { label: 'sm', value: 'sm' },
    { label: 'md', value: 'md' },
    { label: 'lg', value: 'lg' },
    { label: 'xl', value: 'xl' },
    { label: 'xxl', value: 'xxl' },
    { label: 'max', value: 'max' },
  ],
  'generator.input_type': [
    { label: '输入', value: 'input' },
    { label: '下拉', value: 'select' },
    { label: '多选框', value: 'checkbox' },
    { label: '单选框', value: 'radio' },
    { label: '数字', value: 'number' },
    { label: '日期', value: 'date' },
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
