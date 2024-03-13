import { useCreation } from 'ahooks';
import System from './system';

function listCore(plugins) {
  return function (props) {
    const instance = useCreation(() => {
      return new System();
    }, []);

    instance.pluginImpls = plugins.map((p) => p(instance, props));

    console.log('instance::', instance);

    return instance.render();
  };
}

export default listCore;
