import { isString } from '@ihccc/utils';

export default function getAliasName(alias, name) {
  return isString(alias[name]) ? alias[name] : name;
}
