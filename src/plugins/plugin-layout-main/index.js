import Layout from './layout';
import { definePlugin } from '@/components/@comp/create-component';

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
