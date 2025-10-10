import React from 'react';
import get from 'lodash/get';
import { isString } from '@ihccc/utils';
import groupIt from '../utils/group-it';
import columnsHelper from '../columns-helper';
import Grid from '../grid';
import DataItem from '../data-item';
import { DetailContext } from './context';

const Detail = (props) => {
  const { className, style, group, access, name, column, columns, data, gap, border, eventData, eventMap, children } = props;

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
    eventData: eventData || {},
    eventMap: eventMap || {},
  });

  const detailContent = (
    <Grid
      border={border}
      transferStyle
      className={className}
      style={style}
      column={column}
      gap={gap}
      template={
        !group
          ? profileColumns.data.map((item, index) => {
              const key = item.key || item.name || item.dataIndex;
              const value = get(data, item.dataIndex, '');
              const element = <DataItem label={item.title}>{item.render?.(value, data, index) || value}</DataItem>;
              return { ...item, key, element };
            })
          : []
      }
    >
      {children}
    </Grid>
  );

  if (!group) return detailContent;

  const grouped = React.useMemo(() => groupIt(profileColumns.data), [profileColumns.data]);

  const renderGroup = React.useCallback((index) => grouped[index], [grouped]);

  return <DetailContext.Provider value={{ column, gap, renderGroup }}>{detailContent}</DetailContext.Provider>;
};

export default Detail;
