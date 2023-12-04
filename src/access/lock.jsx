import React from 'react';
import useLock from './useLock';

const Lock = (props) => {
  const { name, keys } = props;

  useLock(name, keys);

  return null;
};

export default Lock;
