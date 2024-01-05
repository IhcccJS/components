import transformAction from './ext-action';
import transformExtend from './ext-extend';
import transformFormNode from './ext-form';
import transformRender from './ext-render';
import transformWidth from './ext-width';

export default [
  transformExtend,
  transformWidth,
  transformAction,
  transformRender,
  transformFormNode,
];
