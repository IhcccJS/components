import definePlugin from '../../create-component/definePlugin';
import Layout from './layout';

export default definePlugin({
  name: 'layout',
  priority: 'LAYOUT',
  elementKeys: ['layout', 'head', 'buttonBar', 'children', 'footer'],
  collection: () => ({
    layout: Layout,
    head: [],
    buttonBar: [],
    children: [],
    footer: [],
  }),
});
