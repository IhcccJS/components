import React from 'react';
import { Button, List } from 'antd';
import { useApi } from '@ihccc/hooks';

/*********  System  *********/
class System {
  constructor() {
    this.pluginImpls = {};
    this.elements = {
      layout: null,
      head: [],
      content: [],
    };
  }

  getPlugin(name) {
    return this.pluginImpls[name];
  }

  runPlugins(plugins, props) {
    plugins.forEach((p) => {
      const impl = p(this, props);
      this.pluginImpls[impl.name] = impl;
      if (impl.layout) elements.layout = impl.layout;
      if (impl.head) elements.head.push(impl.head);
      if (impl.content) elements.content.push(impl.content);
    });
  }

  render() {
    const elements = this.elements;
    const head = React.createElement(React.Fragment, null, ...elements.head);

    return React.createElement(elements.layout, { head }, ...elements.content);
  }
}
/*********  System  *********/

/*********  createComponent  *********/
function createComponent(plugins) {
  return function (props) {
    const instance = React.useMemo(() => new System(), []);

    instance.runPlugins(plugins, props);

    return instance.render();
  };
}
/*********  createComponent  *********/

/*********  useRequestHandle  *********/
function useRequestHandle(_, props) {
  const request = useApi(props.query, {
    auto: props.auto !== false,
    initialData: { list: [], total: 0 },
  });

  return { name: 'request', request };
}
/*********  useRequestHandle  *********/

/*********  useLayout  *********/
const cardStyle = { background: '#fff', borderRadius: 8, padding: 16 };

function useLayout() {
  return {
    name: 'layoutMain',
    layout: ({ head, children }) => (
      <div>
        <div style={{ ...cardStyle, marginBottom: 16 }}>{head}</div>
        <div style={cardStyle}>{children}</div>
      </div>
    ),
  };
}
/*********  useLayout  *********/

/*********  useSearchRender  *********/
function useSearchRender(instance) {
  const { request } = instance.getPlugin('request');

  return {
    name: 'search',
    head: (
      <Button loading={request.loading} onClick={() => request.run()}>
        搜索
      </Button>
    ),
  };
}
/*********  useSearchRender  *********/

/*********  useListRender  *********/
function useListRender(instance, props) {
  const { request } = instance.getPlugin('request');

  return {
    name: 'list',
    content: (
      <List
        loading={request.loading}
        itemLayout="horizontal"
        dataSource={request.data.list}
        renderItem={props.renderItem}
      />
    ),
  };
}
/*********  useListRender  *********/

const List = createComponent([
  useRequestHandle,
  useLayout,
  useSearchRender,
  useListRender,
]);

function Demo() {
  return <List query={query} renderItem={(item) => <div>{item.name}</div>} />;
}

export default Demo;
