import React from 'react';
import get from 'lodash/get';
import { isString } from '@ihccc/utils';
import groupIt from '../utils/group-it';
import columnsHelper from '../columns-helper';
import Grid from '../grid';
import DataItem from '../data-item';
import { DetailContext } from './context';

const renderExtension = {
  type: 'item',
  run(item, options) {
    const data = options.eventData.record || {};
    const key = item.key || item.name || item.dataIndex;
    const value = get(data, item.dataIndex, '');
    const element = <DataItem label={item.title}>{item.render?.(value, data, index) || value}</DataItem>;
    return { ...item, key, element };
  },
};

const Detail = (props) => {
  const { className, style, group, access, name, column, columns, data, gap, cellPadding, border, eventData, eventMap, children } = props;

  const profileColumns = columnsHelper.useColumns(columns, {
    enable: {
      cover: true,
      render: true,
      sort: true,
      copy: true,
      tip: true,
      popover: true,
    },
    access: Object.assign({ handler: 'baseList' }, isString(access) ? { name: access } : access),
    name: name || 'profile',
    handler: 'baseList',
    eventData: { ...eventData, record: data },
    eventMap: eventMap || {},
    afterExtension: [renderExtension],
  });

  if (!!group) {
    const grouped = React.useMemo(() => groupIt(profileColumns.data), [profileColumns.data]);

    return <DetailContext.Provider value={{ border, column, gap, grouped }}>{children}</DetailContext.Provider>;
  }

  return (
    <Grid
      border={border}
      transferStyle
      className={className}
      style={style}
      column={column}
      gap={gap}
      cellPadding={cellPadding}
      template={profileColumns.data}
    >
      {children}
    </Grid>
  );
};

export default Detail;
