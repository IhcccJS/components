import React from 'react';
import useAccess from './useAccess';

const Access = (props) => {
  const { akey, children } = props;

  const access = useAccess({ key: akey });

  if (!access) return children;

  if (access.status === 'visible') return children;

  if (access.status === 'disabled') {
    return React.cloneElement(children, { disabled: true });
  }

  return null;
};

export default Access;
