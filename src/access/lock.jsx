import React from 'react';
import AccessContext from './context';

const Lock = ({ accessData }) => {
  const accessContext = React.useContext(AccessContext);

  if (!accessContext.enable) return;

  React.useEffect(() => {
    accessContext.addLockedAccess(accessData);
    return () => accessContext.removeLockedAccess(accessData);
  }, []);
};

export default Lock;
