import React from 'react';
import { isObject } from '@ihccc/utils';
import transform from './transform';
import useAccess from '../access/useAccess';

export function useColumnsAccess(columns, accessConfig) {
  const access = useAccess(
    Object.assign(
      {
        name: false,
        keyName: 'dataIndex',
        data: columns,
      },
      isObject(accessConfig) ? accessConfig : { name: accessConfig },
    ),
  );

  return access;
}

export function useColumnsTransform(columns, config) {
  const columnsFormated = React.useMemo(
    () => transform(columns, config),
    [columns, config],
  );

  return columnsFormated;
}

function useColumns(columns, opts) {
  const { access: accessConfig, ...config } = opts || {};

  const access = useColumnsAccess(columns, accessConfig);

  return useColumnsTransform(access.passedData, config);
}

export default useColumns;
