import React from 'react';
import Grid from '../grid';
import { DetailContext } from './context';

function Group(props) {
  const { index, className, style, border, children } = props;
  const { column, gap, renderGroup } = React.useContext(DetailContext);

  // if (
  //   (Array.isArray(groupIndex) && groupIndex.indexOf(index) < 0) ||
  //   ((typeof groupIndex === 'number' || typeof groupIndex === 'string') && groupIndex !== index) ||
  //   index < 0
  // ) {
  //   return null;
  // }

  const items = renderGroup?.(index);

  const content = <Grid className={className} style={style} transferStyle border={border} column={column} gap={gap} template={items} />;

  return React.isValidElement(children) ? React.cloneElement(children, { children: content }) : content;
}

export default Group;
