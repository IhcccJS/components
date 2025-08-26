import { Button, Switch, Tag } from 'antd';
import { A, WaitButton } from './buttons';
import globalSetter from '../_utils/base/globalSetter';

const buttonSetter = globalSetter([
  [
    'a',
    {
      component: A,
      event: 'click',
    },
  ],
  [
    'button',
    {
      component: Button,
      event: 'click',
    },
  ],
  [
    'switch',
    {
      component: Switch,
      event: 'onChange',
    },
  ],
  [
    'tag',
    {
      component: Tag,
      event: 'click',
    },
  ],
  [
    'waitButton',
    {
      component: WaitButton,
      event: 'click',
    },
  ],
]);

export { buttonSetter };
