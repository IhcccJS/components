import React from 'react';
import { Card, Login } from '@ihccc/components';

function Demo() {
  return (
    <Card style={{ width: 420 }}>
      <Login.OauthButton source={{ name: 'QQ' }} target={{ name: 'Baidu' }} />
    </Card>
  );
}

export default Demo;
