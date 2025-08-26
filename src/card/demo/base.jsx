import { Card } from '@ihccc/components';
import '@ihccc/components/lib/card/index.less';

function Demo() {
  return (
    <Card title="李白" extra="唐" footer="底部内容">
      <p>春眠不觉晓，</p>
      <p>处处闻啼鸟。</p>
    </Card>
  );
}

export default Demo;
