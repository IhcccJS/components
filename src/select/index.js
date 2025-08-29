import AutoComplete from './auto-complete';
import Cascader from './cascader';
import Checkbox from './checkbox';
import Formater from './formater';
import Mentions from './mentions';
import RadioGroup from './radio-group';
import Segmented from './segmented';
import Select from './select';
import SelectView from './select-view/base';
import TreeSelect from './tree-select';

import useOptions from './hooks/useOptions';
import optionStore from './store';

const setOptions = optionStore.set.bind(optionStore);
const delOptions = optionStore.del.bind(optionStore);
const showOptions = optionStore.show.bind(optionStore);

export {
  optionStore,
  setOptions,
  delOptions,
  showOptions,
  useOptions,
  AutoComplete,
  Cascader,
  Checkbox,
  Formater,
  Mentions,
  /** @deprecated 使用 RadioGroup 替代 */
  RadioGroup as Radio,
  RadioGroup,
  Segmented,
  Select,
  SelectView,
  TreeSelect,
};

export default Select;
