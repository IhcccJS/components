import React from 'react';
import Formater from '../../select/formater';

const formatRender = ({ options, mode }) => {
  return (val) => {
    return <Formater options={options} value={val} {...(!mode ? {} : { mode })} />;
  };
};

export default formatRender;
