import { isString } from '@ihccc/utils';
import { renderSetter } from '../../base-list/setter';
import getAliasName from '../getAliasName';

import text from './text';
import number from './number';
import tip from './tip';
import formater from './formater';
import buttons from './buttons';

function register(renderComponents) {
  const componentAlias = renderComponents || {};

  // text
  renderSetter.use(getAliasName(componentAlias, 'text'), text);

  // number
  renderSetter.use(getAliasName(componentAlias, 'number'), number);

  // tip
  renderSetter.use(getAliasName(componentAlias, 'tip'), tip);

  // formater
  renderSetter.use(getAliasName(componentAlias, 'formater'), formater);

  // buttons
  renderSetter.use(getAliasName(componentAlias, 'buttons'), buttons);

  // 头像

  // 头像列表

  // json 数据

  // 图片

  // boolean 值渲染

  // 标签渲染

  // 标签列表渲染

  // 二维码渲染

  for (let key in componentAlias) {
    if (!isString(componentAlias[key])) {
      renderSetter.use(key, componentAlias[key]);
    }
  }
}

export default register;
