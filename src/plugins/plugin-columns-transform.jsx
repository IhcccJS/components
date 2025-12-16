import React from 'react';
import { isString } from '@ihccc/utils';
import columnsHelper from '../columns-helper';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'columnsTransform',
  priority: 'COLLECTING',
  props: [],
  collection: () => ({ eventData: {}, eventMap: {} }),
  main(instance, props) {
    const {
      access,
      name,
      columns = [],
      columnsTransformConfig,
      // indexColumn,
      actionColumn,
      actionButtons,
      eventData = {},
      eventMap = {},
      indexColumn,
    } = props;

    const getIndexColumn = React.useCallback(() => {
      if (!indexColumn) return;
      const { type, ...columnConfig } = indexColumn === true || !indexColumn ? {} : indexColumn;
      if (type === 'order') {
        const requestPlugin = instance.getPlugin('request');
        if (requestPlugin && !columnConfig.page) columnConfig.page = requestPlugin.request?.page;
      }
      return columnConfig;
    }, []);

    const tableColumns = columnsHelper.useColumns(columns, {
      access: Object.assign({ handler: 'baseList' }, isString(access) ? { name: access } : access),
      ...columnsTransformConfig,
      name: name || 'list',
      enable: {
        copy: true,
        cover: true,
        render: true,
        sort: true,
        width: true,
        confirm: true,
        indexColumn: true,
        actionColumn: true,
      },
      indexColumn: getIndexColumn(),
      actionColumn: actionColumn,
      actionButtons: actionButtons,
      // 用户拥有最高权限，可以覆盖内部方法或数据
      eventData: { ...instance.collection.eventData, ...instance.expose, ...eventData },
      eventMap: { ...instance.collection.eventMap, ...eventMap },
    });

    return { tableColumns };
  },
});
