import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {
  register,
  setOptions,
  Formater,
  Segmented,
  Text,
} from '@ihccc/components';

setOptions({
  性别: [
    { label: '👩 女', value: '0' },
    { label: '👨 男', value: '1' },
  ],
  状态: [
    {
      label: '禁用',
      value: '0',
      icon: <CloseCircleOutlined />,
      color: '#F44336',
    },
    {
      label: '启用',
      value: '1',
      icon: <CheckCircleOutlined />,
      color: '#24b588',
    },
  ],
  标签: [
    { label: '老实', value: '0', mode: 'tag' },
    { label: '腼腆', value: '1', mode: 'tag' },
    { label: '乐观', value: '2', mode: 'tag' },
    { label: '包容', value: '3', mode: 'tag' },
    { label: '活泼', value: '4', mode: 'tag' },
    { label: '任性', value: '5', mode: 'tag' },
    { label: '豁达', value: '6', mode: 'tag' },
  ],
});

// 绑定表单元素
register.form(
  {
    sex: (props) => <Segmented {...props} options="性别" />,
  },
  {
    input: { placeholder: '请输入' },
    select: { placeholder: '请选择' },
  },
);

// 绑定渲染方法
register.render({
  default: (max) => (val) =>
    (
      <Text label={val}>
        <Text.Tip max={max} />
      </Text>
    ),
  sex: (val) => <Formater options="性别" value={val} />,
});

register.column();
