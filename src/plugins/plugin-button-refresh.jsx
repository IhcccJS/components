import { ReloadOutlined } from '@ant-design/icons';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'buttonRefresh',
  priority: 'CONTENT',
  props: ['buttonEnabled'],
  before(_, props) {
    const { buttonEnabled = {} } = props;

    if (buttonEnabled.refresh === false) return;
    return {
      button: {
        key: 'refresh',
        props: ({ request }) => ({
          title: '刷新',
          loading: request.loading,
          type: 'dashed',
          icon: <ReloadOutlined />,
        }),
        sort: 180,
      },

      eventMap: {
        refresh: ({ request }) => request.refresh(),
      },
    };
  },
});
