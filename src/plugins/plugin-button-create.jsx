import { PlusOutlined } from '@ant-design/icons';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'buttonCreate',
  priority: 'CONTENT',
  props: ['buttonEnabled', 'eventMap'],
  before(instance, props) {
    const { buttonEnabled = {}, eventMap = {} } = props;

    if (buttonEnabled.create === false || (!eventMap.create && !instance.collection.event?.create)) return;

    return {
      button: {
        key: 'create',
        props: { type: 'primary', icon: <PlusOutlined />, children: '新增' },
        sort: 200,
      },
    };
  },
});
