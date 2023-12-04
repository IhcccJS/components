import { isString } from '@ihccc/utils';
import { formatSetter } from '../../common-form/setter';
// import getAliasName from '../getAliasName';

function register(formatInterface) {
  const formatAlias = formatInterface || {};

  // 必填
  formatSetter.use('required', {
    enter: () => {},
    out: () => {},
  });

  for (let key in formatAlias) {
    if (!isString(formatAlias[key])) {
      formatSetter.use(key, formatAlias[key]);
    }
  }
}

export default register;
