import { isString } from '@ihccc/utils';
import { renderSetter } from '../../setter';
import getAliasName from '../getAliasName';

import text from './text';
import number from './number';
import tip from './tip';
import roll from './roll';
// import eventLink from './event-link';
import formater from './formater';
import progress from './progress';
import buttons from './buttons';
import tagList from './tag-list';
import qrcode from './qrcode';
import avatar from './avatar';
import image from './image';
import imageList from './image-list';
import link from './link';

function register(renderComponents) {
  const componentAlias = renderComponents || {};

  // text
  renderSetter.use(getAliasName(componentAlias, 'text'), text);

  // number
  renderSetter.use(getAliasName(componentAlias, 'number'), number);

  // tip
  renderSetter.use(getAliasName(componentAlias, 'tip'), tip);

  // roll
  renderSetter.use(getAliasName(componentAlias, 'roll'), roll);

  // eventLink
  // renderSetter.use(getAliasName(componentAlias, 'eventLink'), eventLink);
  renderSetter.use(getAliasName(componentAlias, 'link'), link);

  // formater
  renderSetter.use(getAliasName(componentAlias, 'formater'), formater);

  // progress
  renderSetter.use(getAliasName(componentAlias, 'progress'), progress);

  // buttons
  renderSetter.use(getAliasName(componentAlias, 'buttons'), buttons);

  // 头像
  renderSetter.use(getAliasName(componentAlias, 'avatar'), avatar);

  // 头像列表

  // json 数据

  // 图片
  renderSetter.use(getAliasName(componentAlias, 'image'), image);
  renderSetter.use(getAliasName(componentAlias, 'imageList'), imageList);

  // boolean 值渲染

  // 标签渲染

  // 标签列表渲染
  renderSetter.use(getAliasName(componentAlias, 'tagList'), tagList);

  // 二维码渲染
  renderSetter.use(getAliasName(componentAlias, 'qrcode'), qrcode);

  for (let key in componentAlias) {
    if (!isString(componentAlias[key])) {
      renderSetter.use(key, componentAlias[key]);
    }
  }
}

export default register;
