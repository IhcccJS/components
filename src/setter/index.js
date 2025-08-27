import { Button, Switch, Tag } from 'antd';
import { A, WaitButton } from '../button-list/buttons';
import globalSetter from '../utils/globalSetter';

const buttonSetter = globalSetter([
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

const renderSetter = globalSetter();

export { renderSetter };

const columnSetter = globalSetter();

export { columnSetter };

const childrenSetter = globalSetter();

const childrenPropsSetter = globalSetter();

const ruleSetter = globalSetter();

const formatSetter = globalSetter();

export { childrenSetter, childrenPropsSetter, ruleSetter, formatSetter };
