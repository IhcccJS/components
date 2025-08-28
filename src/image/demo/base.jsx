import { Flex } from 'antd';
import { Image } from '@ihccc/components';

function Demo() {
  return (
    <Flex vertical gap={16}>
      <Image src="/哆啦A梦.png" alt="图片" style={{ width: 80 }} />

      <Image.Preview>
        <Flex gap={16} align="center">
          <Image src="/哆啦A梦.png" alt="图片" style={{ width: 80 }} />
          <Image border group="2" src="/胖虎.jpg" alt="图片" />
          <Image border group="2" src="/小夫.jpg" alt="图片" />
          <Image src="/小夫.jpg" alt="图片">
            查看图片
          </Image>
        </Flex>
        <Flex>
          <Image.List items={['/哆啦A梦.png', '/胖虎.jpg', '/小夫.jpg']} max={2} gap="8px" border group="list" />
        </Flex>
      </Image.Preview>
    </Flex>
  );
}

export default Demo;
