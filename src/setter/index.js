import { Button, Switch, Tag } from 'antd';
import { A, WaitButton } from '../button-list/buttons';
import globalStore from '../utils/global-store';

const buttonSetter = globalStore([
  [
    'a',
    {
      component: A,
      event: 'onClick',
    },
  ],
  [
    'button',
    {
      component: Button,
      event: 'onClick',
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
      event: 'onClick',
    },
  ],
  [
    'waitButton',
    {
      component: WaitButton,
      event: 'onClick',
    },
  ],
]);

export { buttonSetter };

const renderSetter = globalStore();

export { renderSetter };

const columnSetter = globalStore();

export { columnSetter };

const childrenSetter = globalStore();

const childrenPropsSetter = globalStore();

const ruleSetter = globalStore();

const formatSetter = globalStore();

export { childrenSetter, childrenPropsSetter, ruleSetter, formatSetter };
