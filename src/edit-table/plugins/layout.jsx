import definePlugin from '../../create-component/definePlugin';

function LayoutEditTable({ content }) {
  return <div style={{ width: '100%' }}>{content}</div>;
}

const Layout = definePlugin({
  name: 'Layout',
  priority: 'LAYOUT',
  elementKeys: ['content'],
  collection: () => ({
    layout: LayoutEditTable,
    content: [],
  }),
});

export default Layout;
