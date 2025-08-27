import definePlugin from '../../../create-component/definePlugin';

function LayoutEditTable({ content }) {
  return <div>{content}</div>;
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
