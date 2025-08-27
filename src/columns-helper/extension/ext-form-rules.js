import { isFunction, isString } from '@ihccc/utils';
import { ruleSetter } from '../../setter';

function run(item, options) {
  const { enable } = options;

  if (!enable.formRules || !item.rules) return item;

  if (!item.itemProps) item.itemProps = {};

  item.itemProps.rules = item.rules.reduce((ruleList, rule) => {
    if (isString(rule)) {
      const ruleFn = ruleSetter.get(rule);
      return ruleList.concat(isFunction(ruleFn) ? ruleFn.call(null, item) : ruleFn);
    }
    return ruleList.concat(rule);
  }, []);

  // delete item.rules;

  return item;
}

/** 实现拷贝功能 */
export default { type: 'item', run };
