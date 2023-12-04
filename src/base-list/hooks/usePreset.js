import React from 'react';
import { getStorage } from '@ihccc/utils';

function usePreset(opts) {
  const data = React.useMemo(() => {
    return [
      ...opts.defaultData,
      ...getStorage(`__fast_query_data_${opts.name}`, []),
    ];
  }, [opts.name]);

  return { data };
}

export default usePreset;
