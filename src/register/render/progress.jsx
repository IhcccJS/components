import React from 'react';
import { Progress } from 'antd';

const progressRender = function (props) {
  return function render(val) {
    return <Progress percent={val} {...props} />;
  };
};

export default progressRender;
