import React from 'react';
import { useUpdate } from 'ahooks';
import { isObject, isFunction } from '@ihccc/utils';

function useDefaultValue(initialValues) {
  const defaultValue = React.useRef(
    isObject(initialValues) ? initialValues : {},
  );
  const update = useUpdate();

  const initValue = React.useCallback(async () => {
    if (isFunction(initialValues)) {
      const vals = await initialValues();
      defaultValue.current = isObject(vals) ? vals : {};
      update();
    }
  }, []);

  React.useEffect(() => {
    initValue();
  }, []);

  return defaultValue.current;
}

export default useDefaultValue;
