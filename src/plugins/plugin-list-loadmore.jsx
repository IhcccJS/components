import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'listLoadMore',
  priority: 'CONTENT',
  props: [],
  main(instance, { buttonEnabled = {} }) {
    const { request } = instance.getPlugin('request');

    if (buttonEnabled.loadButton === false) return;

    return {
      footer: (
        <div
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          {request.data.loadOver ? (
            <span style={{ color: 'var(--color-text-desc)', fontSize: 14 }}>
              - 已经加载完了，总计 {request.data.total} 项 -
            </span>
          ) : (
            <Button
              type="primary"
              loading={request.loading}
              icon={<AppstoreAddOutlined />}
              onClick={() => request.loadMore()}
            >
              加载更多...
            </Button>
          )}
        </div>
      ),
    };
  },
});
