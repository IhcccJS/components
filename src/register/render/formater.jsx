import React from 'react';
import Formater from '../../select-v2/formater';

const formatRender = (options) => {
  return (val) => {
    return <Formater options={options} value={val} />;
  };
};

export default formatRender;
