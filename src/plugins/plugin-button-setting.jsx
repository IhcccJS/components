import { SettingOutlined } from '@ant-design/icons';
import { useSetting } from '@/components/@dev/setting';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'buttonSetting',
  priority: 'CONTENT',
  required: ['extraButtons'],
  props: ['namespace', 'buttonEnabled'],
  before(_, props) {
    const { namespace, buttonEnabled = {} } = props;

    const { options } = useSetting();

    const currentOptions = options.innerOptions[namespace] || {};

    if (!currentOptions.columns || currentOptions.columns.length === 0) return;

    if (buttonEnabled.setting === false) return;

    return {
      button: {
        key: 'setting',
        tip: '设置',
        props: { type: 'dashed', icon: <SettingOutlined /> },
        sort: 155,
      },

      event: {
        setting: ({ modal }) => modal.open('global/sys-setting', { prefix: namespace }),
      },
    };
  },
});
