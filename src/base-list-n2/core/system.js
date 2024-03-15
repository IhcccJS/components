import React from 'react';
import pick from 'lodash/pick';

const createElements = (elements, fragment) => {
  const children = elements.map(({ content, props }) => {
    if (typeof content === 'function' || typeof content.type === 'function')
      return React.createElement(content, props);
    return content;
  });
  if (!fragment) return children;
  return React.createElement(React.Fragment, null, ...children);
};

class System {
  TYPE = {
    system: 10,
    instance: 50,
    layout: 60,
    content: 70,
    button: 80,
  };

  constructor() {
    this.pluginImpls = new Map();
    this.elements = {};
  }

  runPlugins(plugins, props) {
    this.elements = {
      layout: null,
      head: [],
      content: [],
      buttonBar: [],
      button: props.button || [],
      event: {},
      refs: {},
    };

    plugins.forEach((p) => {
      const impl = p(this, props);
      this.pluginImpls.set(impl.name, impl);

      if (impl.layout) this.elements.layout = impl.layout;
      if (impl.head) {
        const needProps = pick(props, impl.props);
        this.elements.head.push({ content: impl.head, props: needProps });
      }
      if (impl.content) {
        const needProps = pick(props, impl.props);
        this.elements.content.push({ content: impl.content, props: needProps });
      }
      if (impl.buttonBar) {
        const needProps = pick(props, impl.props);
        this.elements.buttonBar.push({
          content: impl.buttonBar,
          props: needProps,
        });
      }
      if (impl.button)
        this.elements.button = this.elements.button.concat(impl.button);
      if (impl.event) Object.assign(this.elements.event, impl.event);
      if (impl.refs) Object.assign(this.elements.refs, impl.refs);
    });
  }

  getPlugin(name) {
    return this.pluginImpls.get(name);
  }

  render() {
    const elements = this.elements;

    // const layout = elements.layout.reduce((children, layout) => {
    //   return React.createElement
    // }, null);
    const head = createElements(elements.head, true);

    const buttonBar = createElements(elements.buttonBar, true);

    const children = createElements(elements.content);

    return React.createElement(
      elements.layout,
      { head, buttonBar, ref: elements.refs.root },
      ...children,
    );
  }
}

export default System;
