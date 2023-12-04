import React from 'react';
import { isObject } from '@ihccc/utils';

function useTitle(title, type) {
  return React.useMemo(
    () =>
      isObject(title) && React.isValidElement(title) === false
        ? title[type]
        : title,
    [title, type],
  );
}

export default useTitle;
