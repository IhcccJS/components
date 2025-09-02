import React from 'react';
import Image from '../../image';

function imageRender(props) {
  return function render(val) {
    return <Image src={val} {...props} />;
  };
}

export default imageRender;
