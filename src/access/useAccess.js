import React from 'react';
import AccessContext from './context';

export function useMatchOneAccess({ data, key }) {
  const { enable, getHitOneFilter } = React.useContext(AccessContext);

  if (!enable) return { passedData: data };

  return getHitOneFilter({ key });
}

export function useMatchSomeAccess({ name, keyName, handler }) {
  const { enable, getHitManyFilter } = React.useContext(AccessContext);

  if (!enable) return null;

  const filter = React.useMemo(() => getHitManyFilter({ name, keyName, handler }), []);

  return { filter };
}

function useAccess(opts) {
  const { disabled, data, key, name, keyName, handler } = opts || {};

  if (disabled) return { passedData: data };

  if (!!key) return useMatchOneAccess({ data, key });

  const access = useMatchSomeAccess({ name, keyName, handler });

  if (!access) return { passedData: data };

  const passedData = React.useMemo(() => access.filter(data), [data]);

  return { passedData };
}

export default useAccess;
