import definePlugin from '../../create-component/definePlugin';
import Layout from './layout';

export default definePlugin({
  name: 'layout',
  priority: 'LAYOUT',
  elementKeys: ['layout', 'head', 'buttonBar', 'children', 'footer'],
  props: ['sticky', 'layoutStyle', 'inlineHead', 'renderContent', 'title', 'className', 'style'],
  collection: () => ({
    layout: Layout,
    head: [],
    buttonBar: [],
    children: [],
    footer: [],
  }),
});
