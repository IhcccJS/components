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
      showIndex = true,
    } = props;

    const getIndexType = React.useCallback(() => {
      if (showIndex === false) return;
      if (showIndex === 'order') {
        const { request } = instance.getPlugin('request');
        return request?.page;
      }
      return showIndex;
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
      indexColumn: getIndexType(),
      actionColumn: actionColumn,
      actionButtons: actionButtons,
      eventData: { ...eventData, ...instance.collection.data, ...instance.expose },
      eventMap: { ...eventMap, ...instance.collection.event },
    });

    return { tableColumns };
  },
});
