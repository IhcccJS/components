import { Button, Switch, Tag } from 'antd';
import { A } from './buttons';
import globalSetter from '../utils/base/globalSetter';

const buttonSetter = globalSetter([
  ['a', A],
  ['button', Button],
  ['switch', Switch],
  ['tag', Tag],
]);

export { buttonSetter };
