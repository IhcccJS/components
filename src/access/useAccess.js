import React from 'react';
// import cloneDeep from 'lodash/cloneDeep';
import AccessContext from './context';

function useAccess(opts) {
  const config = React.useRef(opts || {}).current;
  const { key, keyName, name, data, handler } = config;

  if (!key && name === false) return { passedData: data };

  const { enable, getPathname, getHitOneFilter, getHitManyFilter } =
    React.useContext(AccessContext);

  if (!enable) return { passedData: data };

  const path = (getPathname && getPathname()) || window.location.pathname;

  if (!!key) return getHitOneFilter({ path, key });

  const filter = React.useMemo(
    () => getHitManyFilter({ path, name }, { keyName, handler }),
    [getHitManyFilter],
  );

  const passedData = React.useMemo(() => filter(data), [filter, data]);

  return { filter, passedData };
}

export default useAccess;
