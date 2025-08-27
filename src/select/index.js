import AutoComplete from './auto-complete';
import Cascader from './cascader';
import Checkbox from './checkbox';
import Formater from './formater';
import Mentions from './mentions';
import Radio from './radio';
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
  Radio,
  Segmented,
  Select,
  SelectView,
  TreeSelect,
};

export default Select;
