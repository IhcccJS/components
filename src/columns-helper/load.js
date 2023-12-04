import { isObject, isArray } from '@ihccc/utils';
import filterOfVisible from './filterOfVisible';

const updateOne = (array, col) => {
  const key = col.key || col.dataIndex;
  for (let i = 0; i < array.length; i++) {
    if (array[i].dataIndex === key || array[i].key === key) {
      array[i] = { ...array[i], ...col };
      break;
    }
  }
};

const findIndex = (array, key) => {
  for (let index = 0; index < array.length; index++) {
    if ((array[index].dataIndex || array[index].key) === key) return index;
  }
  return -1;
};

function load(source) {
  let columns = [...source];

  const operation = {
    // 获取指定名称的配置
    get: (keys) => {
      if (isArray(keys)) {
        return columns.filter((item) =>
          keys.includes(item.dataIndex || item.key),
        );
      }
      return columns;
    },
    // 获取除了指定名称的配置
    except: (keys) => {
      if (isArray(keys)) {
        return columns.filter(
          (item) => keys.includes(item.dataIndex || item.key) === false,
        );
      }
      return columns;
    },
    // 修改后的配置
    set: (cols) => {
      if (isObject(cols)) {
        updateOne(columns, cols);
      } else if (isArray(cols)) {
        cols.forEach((item) => updateOne(columns, item));
      }
      return operation;
    },
    // 过滤 visible 的配置
    filter: (type) => {
      columns = columns.filter(filterOfVisible(type));
      return operation;
    },
    // 在尾部追加后的配置
    push: (column) => {
      columns.push(column);
      return operation;
    },
    // 在首部追加的配置
    unshift: (column) => {
      columns.unshift(column);
      return operation;
    },
    // 在某一项后追加后的配置
    after: (key, cols) => {
      const index = findIndex(columns, key);
      if (index > -1) columns.splice(index + 1, 0, cols);
      return operation;
    },
    // 在某一项前追加后的配置
    before: (key, cols) => {
      const index = findIndex(columns, key);
      if (index > -1) columns.splice(index, 0, cols);
      return operation;
    },
  };

  return operation;
}

export default load;
