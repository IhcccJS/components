import { isString, isObject, isFunction, isArray } from '@ihccc/utils';

class GlobalSetter {
  constructor(defaultStore) {
    this.store = new Map(defaultStore);
  }

  use(name, component) {
    if (!name || !component) throw new Error('缺少必须参数：', name, component);
    this.store.set(name, component);
  }

  set(newList) {
    if (isObject(newList) === false) {
      throw new Error('set 方法设置的值必须是个对象！');
    }

    for (const key in newList) {
      this.store.set(key, newList[key]);
    }
  }

  get(name) {
    if (isString(name)) return this.store.get(name);

    if (isObject(name)) {
      const { type, params } = name;
      return (
        isFunction(this.store.get(type)) &&
        this.store.get(type).call(this, params)
      );
    }

    if (isArray(name)) {
      const [type] = name;
      return (
        isFunction(this.store.get(type)) &&
        this.store.get(type).apply(this, name.slice(1))
      );
    }
  }
}

const globalSetter = (defaultStore) => new GlobalSetter(defaultStore);

export default globalSetter;
