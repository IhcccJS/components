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
import store from './store';

const setOptions = store.set.bind(store);

const showOptions = store.show.bind(store);

export {
  setOptions,
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
