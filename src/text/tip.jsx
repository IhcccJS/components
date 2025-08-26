import React from 'react';
import { Tooltip } from 'antd';
import { isString } from '@ihccc/utils';

const RULE = {
  start: (max, symbol) => {
    const reg = new RegExp('.+(.{' + max + '})');
    const content = (symbol || '') + '$1';
    return (value) => value.replace(reg, content);
  },
  center: (max, symbol) => {
    const size = Math.floor(max / 2);
    const reg = new RegExp('(.{' + size + '}).+(.{' + size + '})');
    const content = '$1' + (symbol || '') + '$2';
    return (value) => value.replace(reg, content);
  },
  end: (max, symbol) => {
    const reg = new RegExp('(.{' + max + '}).+');
    const content = '$1' + (symbol || '');
    return (value) => value.replace(reg, content);
  },
};

function Tip(props) {
  const { label, max = 10, rule = 'end', symbol = '...', ...restProps } = props;
  const replaceRef = React.useRef();

  const content = React.useMemo(() => {
    if (isString(label) && label.length > max) {
      if (!replaceRef.current && rule in RULE) replaceRef.current = RULE[rule](max, symbol);
      return (replaceRef.current || rule)?.(label);
    }
    return null;
  }, [label]);

  if (!content) return label || null;

  return (
    <Tooltip title={label} {...restProps}>
      {content}
    </Tooltip>
  );
}

export default Tip;
