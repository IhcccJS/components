import React from 'react';
import { useUpdate, useUnmountedRef } from 'ahooks';
import { getStorage, setStorage, removeStorage } from '@ihccc/utils';

function mergeColumns(target, lib) {
  if (target.length === 0) return;
  const merged = [];
  for (let index = 0; index < target.length; index++) {
    const node = target[index];
    const findSource = lib[node.k];
    if (!!findSource) {
      merged.push({
        ...findSource,
        ...(!node.a ? {} : { align: node.a }),
        ...(!node.f ? {} : { fixed: node.f }),
        _checked: node.c,
      });
    }
  }
  return merged;
}

function formatSaveData(target, lib) {
  return target.map((item) => {
    const { align, fixed } = item;
    const key = item.key || item.dataIndex;
    const source = lib[key];
    return Object.assign(
      { k: key, c: item._checked !== false },
      align === source.align || !align ? {} : { a: align },
      fixed === source.fixed ? {} : { f: fixed === '' ? false : fixed },
    );
  });
}

function useMergeColumns(columns, config) {
  const { saveName } = config || {};
  const columnsRef = React.useRef(columns);
  const columnsLibRef = React.useRef({});
  const unmountedRef = useUnmountedRef();
  const update = useUpdate();

  const storageName = React.useRef(saveName || window.location.href).current;

  React.useEffect(() => {
    columns.forEach((item) => {
      columnsLibRef.current[item.key || item.dataIndex] = { ...item };
    });
  }, [columns]);

  const mergeData = React.useCallback((target) => {
    if (unmountedRef.current) return;
    const newColumns = mergeColumns(target, columnsLibRef.current);
    if (!newColumns) return;
    columnsRef.current = newColumns;
    update();
  }, []);

  const save = React.useCallback((editData, isDefault) => {
    const formated = formatSaveData(editData, columnsLibRef.current);
    mergeData(formated);
    if (isDefault) {
      removeStorage(storageName);
    } else {
      setStorage(storageName, formated);
    }
  }, []);

  React.useEffect(() => {
    const localColumns = getStorage(storageName, []);
    mergeData(localColumns);
  }, []);

  return {
    source: columnsRef.current,
    columns: columnsRef.current.filter((item) => item._checked !== false),
    save,
  };
}

export default useMergeColumns;
