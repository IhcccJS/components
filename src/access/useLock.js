import React from 'react';
import AccessContext from './context';

function useLock(name, keys) {
  const accessContext = React.useContext(AccessContext);

  if (!accessContext.enable) return;

  React.useEffect(() => {
    accessContext.addLockedAccess(name, keys);
    return () => accessContext.removeLockedAccess(name, keys);
  }, []);
}

export default useLock;
