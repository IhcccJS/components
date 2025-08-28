import React from 'react';
import { FoldSide } from '@ihccc/components';

function Demo() {
  return (
    <div style={{ position: 'relative', background: '#f1f1f1', height: 480, overflow: 'hidden' }}>
      <FoldSide title="折叠信息" placement="left" style={{ width: 240 }}>
        内容
      </FoldSide>
    </div>
  );
}

export default Demo;
