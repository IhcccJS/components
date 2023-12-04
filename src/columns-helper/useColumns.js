import React from 'react';
import { isObject } from '@ihccc/utils';
import transform from './transform';
import useAccess from '../access/useAccess';

function useColumns(columns, opts) {
  const { access: accessConfig, ...config } = opts || {};

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

  const columnsFormated = React.useMemo(
    () => transform(access.passedData, config),
    [access.passedData],
  );

  return columnsFormated;
}

export default useColumns;
