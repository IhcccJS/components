import { Flex, Button } from 'antd';

function Base({ children }) {
  return <Flex gap={8}>{children}</Flex>;
}

function Trigger() {
  return (
    <Base>
      <a>选择文件</a>
    </Base>
  );
}

function Preview({ disabled, file, progressProps, removeAble, onRemove }) {
  return (
    <Base>
      <span>{file.name}</span>
      <span>{file.type}</span>
      <Button type="link" size="small" danger onClick={onRemove}>
        删除
      </Button>
    </Base>
  );
}

export { Base, Trigger, Preview };
