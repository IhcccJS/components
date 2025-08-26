import { EventEmitter, isObject } from '@ihccc/utils';

class Store extends EventEmitter {
  constructor() {
    super();

    this.store = new Map();
  }

  set(data) {
    if (isObject(data) === false) {
      throw new Error('set 方法参数值必须是个对象！');
    }

    for (const key in data) {
      this.store.set(key, data[key]);
      this.emit('change/' + key, this);
    }

    this.emit('change', this);
  }

  del(data) {
    if (isObject(data) === false) {
      throw new Error('del 方法参数值必须是个对象！');
    }

    for (const key in data) {
      this.store.delete(key);
      this.emit('change/' + key, this);
    }

    this.emit('change', this);
  }

  get(name, defaultValue) {
    return this.store.get(name) ?? defaultValue;
  }

  show() {
    console.log(`📍 global options name list:`, this.store.keys());
  }
}

export default new Store();
