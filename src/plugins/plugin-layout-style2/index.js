import definePlugin from '../../create-component/definePlugin';
import Layout from './layout';

export default definePlugin({
  name: 'layout',
  priority: 'LAYOUT',
  elementKeys: ['layout', 'head', 'buttonBar', 'children', 'footer'],
  props: ['sticky', 'renderContent', 'className'],
  collection: () => ({
    layout: Layout,
    head: [],
    buttonBar: [],
    children: [],
    footer: [],
  }),
});
