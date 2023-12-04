import React from 'react';
import { isObject, isFunction } from '@ihccc/utils';

function useValue(initialValues, opts = {}) {
  const { remain = false } = opts;
  const [defaultValue, setDefaultValue] = React.useState({});
  const [value, setValue] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const resetValue = React.useCallback(() => {
    setValue(Object.assign({}, defaultValue));
  }, [defaultValue]);

  const initValue = React.useCallback(async () => {
    let initValues = initialValues;
    if (isFunction(initialValues)) {
      setLoading(true);
      const vals = await initialValues();
      setLoading(false);
      initValues = isObject(vals) ? vals : {};
    }
    setDefaultValue(initValues);
    setValue(initValues);
  }, [initialValues]);

  const setMergeValue = React.useCallback((patch) => {
    setValue((prevState) => ({
      ...prevState,
      ...(isFunction(patch) ? patch(prevState) : patch),
    }));
  }, []);

  React.useEffect(() => {
    if (remain) return;
    initValue();
  }, [remain, initialValues]);

  return {
    loading,
    defaultValue,
    value,
    setDefaultValue,
    setValue,
    setMergeValue,
    resetValue,
  };
}

export default useValue;
