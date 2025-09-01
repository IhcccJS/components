import { isString } from '@ihccc/utils';
import { ruleSetter } from '../../setter';
// import getAliasName from '../getAliasName';

function register(ruleInterface) {
  const ruleAlias = ruleInterface || {};

  // // 必填
  // ruleSetter.use(getAliasName(ruleAlias, 'required'), function (message) {
  //   console.log(this, message);

  //   return {
  //     required: true,
  //     message: message || '请输入必填项',
  //   };
  // });

  // // 数字
  // ruleSetter.use(getAliasName(ruleAlias, 'isNumber'), (message) => ({
  //   pattern: /^\d+$/,
  //   message: message || '输入项不是数字',
  // }));

  // // 手机号码
  // ruleSetter.use(getAliasName(ruleAlias, 'isTelephone'), (message) => ({
  //   // pattern: /1[2-9]\d{9}/,
  //   message: message || '输入项不是手机号码',
  // }));

  // // 邮箱
  // ruleSetter.use(getAliasName(ruleAlias, 'isEmail'), (message) => ({
  //   // pattern: /1[2-9]\d{9}/,
  //   message: message || '输入项不是邮箱',
  // }));

  // // 身份证
  // ruleSetter.use(getAliasName(ruleAlias, 'isIdcard'), (message) => ({
  //   // pattern: /1[2-9]\d{9}/,
  //   message: message || '输入项不是身份证',
  // }));

  // // 路径
  // ruleSetter.use(getAliasName(ruleAlias, 'isPath'), (message) => ({
  //   // pattern: /1[2-9]\d{9}/,
  //   message: message || '输入项不是路径信息',
  // }));

  // // url 地址
  // ruleSetter.use(getAliasName(ruleAlias, 'isUrl'), (message) => ({
  //   // pattern: /1[2-9]\d{9}/,
  //   message: message || '输入项不是 url 地址',
  // }));

  // console.log(ruleSetter);

  for (let key in ruleAlias) {
    if (!isString(ruleAlias[key])) {
      ruleSetter.use(key, ruleAlias[key]);
    }
  }
}

export default register;
