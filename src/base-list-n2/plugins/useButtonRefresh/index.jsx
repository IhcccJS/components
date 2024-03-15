import { ReloadOutlined } from '@ant-design/icons';

function useButtonRefresh(instance, props) {
  return {
    name: 'buttonRefresh',

    button: [
      {
        key: 'refresh',
        tip: '刷新',
        props: ({ request }) => ({
          loading: request.loading,
          type: 'dashed',
          icon: <ReloadOutlined />,
        }),
      },
    ],

    event: {
      refresh: ({ request }) => request.refresh(),
    },
  };
}

export default useButtonRefresh;
