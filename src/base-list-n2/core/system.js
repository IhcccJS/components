import React from 'react';

class System {
  pluginImpls = [];

  constructor() {}

  render() {
    const elements = {
      layout: null,
      head: [],
      content: [],
    };

    this.pluginImpls.forEach((p) => {
      if (p.layout) elements.layout = p.layout;
      if (p.head) elements.head.push(p.head);
      if (p.content) elements.content.push(p.content);
    });

    const head = React.createElement(React.Fragment, null, ...elements.head);

    return React.createElement(elements.layout, { head }, ...elements.content);
  }
}

export default System;
