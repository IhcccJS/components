import React from 'react';
import { Form } from 'antd';

function refreshPlugin({ TYPE }) {
  return {
    key: 'form-search',

    type: TYPE.ELEMENT,

    propName: 'search',

    component: (props) => <Form {...props} />,
  };
}

export default refreshPlugin;
