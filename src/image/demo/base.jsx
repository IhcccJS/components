import { Flex } from 'antd';
import { Image } from '@ihccc/components';

function Demo() {
  return (
    <Flex vertical gap={16}>
      <Image src="/ihccc-components/哆啦A梦.png" alt="图片" style={{ width: 80 }} />

      <Image.Preview>
        <Flex gap={16} align="center">
          <Image src="/ihccc-components/哆啦A梦.png" alt="图片" style={{ width: 80 }} />
          <Image border group="2" src="/ihccc-components/胖虎.jpg" alt="图片" />
          <Image border group="2" src="/ihccc-components/小夫.jpg" alt="图片" />
          <Image src="/ihccc-components/小夫.jpg" alt="图片">
            查看图片
          </Image>
        </Flex>
        <Flex>
          <Image.List
            items={['/ihccc-components/哆啦A梦.png', '/ihccc-components/胖虎.jpg', '/ihccc-components/小夫.jpg']}
            max={2}
            gap="8px"
            border
            group="list"
          />
        </Flex>
      </Image.Preview>
    </Flex>
  );
}

export default Demo;
