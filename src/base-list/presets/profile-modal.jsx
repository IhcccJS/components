import React from 'react';
import Detail from '../../detail';
import Profiler from '../profiler';

function ProfileModal({
  access,
  name,
  columns,
  colProps,
  filter,
  layout,
  column,
  grid,
  max,
  gap,
  children,
  ...restProps
}) {
  return (
    <Profiler width={720} {...restProps}>
      <Detail
        access={access}
        name={name}
        columns={columns}
        colProps={colProps}
        filter={filter}
        column={column}
        grid={grid}
        max={max}
        gap={gap}
      >
        {children || <Detail.Item layout={layout} />}
      </Detail>
    </Profiler>
  );
}

export default ProfileModal;
