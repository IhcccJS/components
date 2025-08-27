import React from 'react';
import { Flex, Button, Typography } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import definePlugin from '../create-component/definePlugin';

const { Paragraph } = Typography;

function ExportContent({ exportOption, data }) {
  const textData = React.useMemo(() => JSON.stringify(data), [data]);

  const exportData = React.useCallback(() => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, exportOption.fileName + '.' + 'json');
  }, []);

  return (
    <Flex vertical justify="center" gap={8} style={{ textAlign: 'center' }}>
      <h3 style={{ margin: 0 }}>当前支持 Json 格式数据导出</h3>
      <p style={{ margin: 0, color: 'var(--color-text-desc)' }}>导出当前已查询数据</p>
      <Button type="primary" block onClick={exportData}>
        立即导出
      </Button>
      <Paragraph copyable={{ text: textData }} style={{ margin: 0 }}>
        拷贝数据
      </Paragraph>
    </Flex>
  );
}

export default definePlugin({
  name: 'buttonExport',
  priority: 'CONTENT',
  props: ['buttonEnabled', 'exportOption'],
  before(_, props) {
    const { buttonEnabled = {}, exportOption = {} } = props;

    if (buttonEnabled.export === false) return;

    return {
      button: {
        key: 'export',
        tip: '导出',
        props: { type: 'dashed', icon: <ExportOutlined /> },
        sort: 155,
      },

      event: {
        export: ({ modal, request }) => modal.open('export', { data: request.data }),
      },

      modalItem: {
        name: 'export',
        keep: true,
        content: ExportContent,
        props: { title: '数据导出', width: 360, exportOption, footer: null },
        transfer: ['data', 'exportOption'],
      },
    };
  },
});
