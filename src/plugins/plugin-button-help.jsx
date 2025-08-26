import { QuestionCircleOutlined } from '@ant-design/icons';
import { definePlugin } from '@/components/@comp/create-component';

function HelpContent() {
  return <h2>帮助</h2>;
}

export default definePlugin({
  name: 'buttonHelp',
  priority: 'CONTENT',
  props: ['buttonEnabled'],
  before(_, props) {
    const { buttonEnabled = {} } = props;

    if (buttonEnabled.help === false) return;

    return {
      button: {
        key: 'help',
        tip: '帮助',
        props: { type: 'link', icon: <QuestionCircleOutlined />, children: '遇到了问题？' },
      },

      event: {
        help: ({ modal }) => modal.open('help'),
      },

      modalItem: {
        name: 'help',
        content: HelpContent,
        props: { title: '用户帮助', footer: null },
      },
    };
  },
});
