import React from 'react';
import { isString } from '@ihccc/utils';
import columnsHelper from '../columns-helper';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'columnsTransform',
  priority: 'COLLECTING',
  props: [],
  collection: () => ({ data: {}, event: {} }),
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
      if (indexColumn === false) return;
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
      eventData: { ...eventData, ...instance.collection.data, ...instance.expose },
      eventMap: { ...eventMap, ...instance.collection.event },
    });

    return { tableColumns };
  },
});
