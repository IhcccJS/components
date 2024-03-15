import React from 'react';
import { useCreation } from 'ahooks';
import System from './system';

function listCore(plugins) {
  return React.memo(function (props) {
    const instance = useCreation(() => {
      return new System();
    }, []);

    instance.runPlugins(plugins, props);

    console.log('instance::', instance);

    return instance.render(props);
  });
}

export default listCore;
