import React from 'react';
import { Card } from 'antd';
import { LazyRender } from '@ihccc/components';
import { useApi } from '@ihccc/hooks';

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username: 'ABC' });
    }, 2000);
  });
}

function LoadRun({ onLoad }) {
  React.useEffect(() => {
    onLoad && onLoad(true);
  }, []);

  return null;
}

function Demo() {
  const [loaded, setLoaded] = React.useState(false);

  const user = useApi(getUser, {
    verify: () => true,
  });

  return (
    <Card
      bodyStyle={{
        height: 560,
        overflow: 'auto',
        background: loaded ? '#C8E6C9' : '#f1f1f1',
      }}
    >
      <Card bodyStyle={{ height: 1200 }}>请滑到底部</Card>

      <LazyRender threshold={50} style={{ marginTop: 20 }}>
        <LoadRun onLoad={setLoaded} />
        <Card>
          <p>Demo 1</p>
          <p>看到此内容，背景会变绿色</p>
        </Card>
      </LazyRender>

      <LazyRender
        threshold={0}
        onEnter={() => user.run()}
        style={{ marginTop: 20 }}
      >
        <Card>
          <p>Demo 2</p>
          <p>看到此内容，自动加载数据</p>
          <span>{user.loading ? '加载中...' : JSON.stringify(user.data)}</span>
        </Card>
      </LazyRender>
    </Card>
  );
}

export default Demo;
