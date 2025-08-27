import React from 'react';
import Formater from '../../select/formater';

const formatRender = (options) => {
  return (val) => {
    return <Formater options={options} value={val} />;
  };
};

export default formatRender;
