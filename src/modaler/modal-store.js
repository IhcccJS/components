import React from 'react';
import { isFunction, eventEmitter } from '@ihccc/utils';
import defaultContainer from './container';
import { ContentContext } from './context';

const DEFAULT_MODAL_ZINDEX = {
  normal: 800,
  focus: 801,
};

const separate = (obj, names) => {
  const pick = {};
  const unpick = {};
  if (!obj) return [pick, unpick];
  if (!names) return [pick, obj];
  for (const key in obj) {
    if (names.indexOf(key) > -1) {
      pick[key] = obj[key];
    } else {
      unpick[key] = obj[key];
    }
  }
  return [pick, unpick];
};

const isFilterKey = (key) => key !== void 0 && key !== null;

class ModalStore {
  constructor({
    max,
    container,
    defaultType,
    defaultModalProps,
    onOpenOverflow,
    update,
  }) {
    // 当前命名空间名称
    this.namespace = null;
    // 已经注册的内容列表
    this.registry = new Map();
    // 创建的弹窗以及内容
    this.modalList = new Map();
    // 渲染索引
    this.renderIndex = -1;
    // 最大打开数量
    this.max = max || 10;
    // 默认渲染的弹窗类型
    this.defaultType = defaultType || 'modal';
    // 默认弹窗参数
    this.defaultModalProps = defaultModalProps;
    // 弹窗容器集合 { modal: Modal, drawer: Drawer, ... }
    this.container = Object.assign({}, defaultContainer, container);
    // open 超出最大打开数量回调
    this.onOpenOverflow = onOpenOverflow;
    // 弹窗打开的层级
    this.modalZIndex = {
      ...DEFAULT_MODAL_ZINDEX,
    };

    // 强制更新组件
    this.update = update;
  }

  // 返回完整的弹窗索引名称
  // namespace/name/key -> 命名空间/弹窗名称/打开的key
  getKey(name, original) {
    const isKey = /^\w+\/\w+/.test(name);
    const keys = isKey
      ? name.split('/')
      : [this.namespace].concat(name).filter(isFilterKey);
    return (original ? keys.slice(0, 2) : keys).join('/');
  }

  // 设置当前的命名空间
  setNamespace(namespace) {
    this.namespace = namespace;
    this.update();
  }

  // 注册单个弹窗内容配置
  _registerItem(config) {
    const key = this.getKey(config.name);
    if (this.registry.has(key)) return;
    const item = {
      name: config.name,
      type: config.type || this.defaultType,
      content: config.content,
      keep: config.keep,
      preload: config.preload,
      renderToCurrent: config.renderToCurrent,
      props: config.props,
      transfer: config.transfer,
      events: config.events,
      taskData: config.taskData,
      repeat: config.repeat,
      namespace: this.namespace,
      key,
    };
    this.registry.set(key, item);
    if (item.preload) {
      this._createModal(item);
      if (item.props?.open) this.open(key);
    }
  }

  // 注册弹窗内容配置
  register(items) {
    if (!items) return;
    for (let index = 0; index < items.length; index++) {
      this._registerItem(items[index]);
    }
    this.update();
  }

  // 注销当前 namespace 下所以非 keep 弹窗内容配置
  unregister() {
    this.registry.forEach((item, key) => {
      if (item.namespace === this.namespace || !item.keep) {
        this.registry.delete(key);
        this.modalList.delete(key);
      }
    });
    this.update();
  }

  // 获取指定的注册配置
  _getRegistry(name) {
    const key = this.getKey(name, true);
    if (this.registry.has(key) === false) {
      console.error('No exist registry of ' + name + '!');
      return {};
    }
    return { key: this.getKey(name), item: this.registry.get(key) };
  }

  // 获取弹窗是否已经创建
  getMounted(name) {
    const key = this.getKey(name);
    if (!key) return false;
    return this.modalList.has(key);
  }

  // 创建指定的弹窗内容
  _createModal(item) {
    // namespace,
    // name,
    // key,
    // element,
    // zIndex,
    // renderIndex,
    // status: {},
    // source: {},
    // props: {},
    this.renderIndex += 1;

    const modalConfig = {
      namespace: item.namespace,
      name: item.name,
      key: item.key,
      type: item.type,
      element: React.memo(item.content),
      zIndex: this.modalZIndex.normal,
      renderIndex: this.renderIndex,
      open: false,
      focus: false,
      source: item,
      props: {
        ...this.defaultModalProps?.[item.type],
        ...item.props,
      },
      transfer: item.transfer,
      ee: item.events ? eventEmitter() : null,
      taskData: item.taskData,
      repeatKey: item.repeatKey,
      _readyClose: false,
    };

    const modalRef = {
      bringToTop: () => this.bringToTop(item.repeatKey || item.key),
      open: () => this.open(item.repeatKey || item.key),
      hide: () => this.hide(item.repeatKey || item.key),
      close: () => this.close(item.repeatKey || item.key),
      destroy: () => this.destroy(item.repeatKey || item.key),
    };

    this.modalList.set(item.repeatKey || item.key, {
      ...modalConfig,
      modalRef,
    });
  }

  // 更新内容配置，如果要修改深层数据，config 传回调进行修改
  setModalConfig(name, config) {
    const key = this.getKey(name);
    if (!key) return;
    const modalItem = this.modalList.get(key);
    const nextConfig = isFunction(config)
      ? config(modalItem)
      : { ...modalItem, ...config };
    this.modalList.set(key, nextConfig);
    this.update();
  }

  // 删除指定的弹窗内容
  _removeModal(name) {
    const key = this.getKey(name);
    if (!key) return;
    if (this.modalList.has(key)) {
      this.renderIndex -= 1;
      this.modalList.delete(key);
    }
  }

  // 获取弹窗是否打开状态
  getModalOpen(name) {
    const key = this.getKey(name);
    if (!key) return;
    const modalItem = this.modalList.get(key);
    return modalItem?.open || false;
  }

  // 设置弹窗组件的参数
  setProps(name, props) {
    const key = this.getKey(name);
    if (!key) return;
    const mounted = this.getMounted(key);
    if (mounted === false) return;
    this.setModalConfig(name, (config) => ({
      ...config,
      props: { ...config.props, ...props },
    }));
    this.update();
  }

  // 获取弹窗组件的参数
  // getModalProps(name) {
  // const key = this.getKey(name);
  //   if (!key) return;
  //   const config = this.modalList.get(key);
  //   return config?.props || {};
  // }

  // 打开指定的弹窗
  open(name, props = {}) {
    if (props.open === false) return;
    if (this.modalList.size >= this.max) {
      this.onOpenOverflow?.();
      return;
    }
    let { key, item } = this._getRegistry(name);
    if (!key || !item) return;
    const mounted = this.getMounted(key);
    if (!mounted && item.repeat) {
      // 重复打开，需要对每个重复打开的弹窗配置不同的key，可以使用数据中的 key 作为不会重复的 key
      const repeatKey = item.repeat?.getKey?.(props) || props?.key;
      if (!isFilterKey(repeatKey)) {
        console.error(
          'set config: "repeat: { getKey: (data) => data.key }" when open same modal again.',
        );
        return;
      }
      key = [name, repeatKey];
      if (!this.getMounted(key)) {
        this._createModal({ ...item, repeatKey: this.getKey(key) });
      }
    } else if (!mounted && !item.repeat) {
      // 未创建并且不能重复打开
      this._createModal(item);
    }
    // 设置弹窗的参数
    this.setModalConfig(key, (config) => ({
      ...config,
      open: true,
      props: { ...config.props, ...props },
    }));
    // 新打开的弹窗进行置顶
    this.bringToTop(key);
    this.update();
  }

  // 隐藏指定的弹窗
  hide(name, props) {
    const key = this.getKey(name);
    if (!key) return;
    const mounted = this.getMounted(key);
    if (mounted === false) return;
    this.setModalConfig(key, (config) => ({
      ...config,
      open: false,
      focus: false,
      zIndex: this.modalZIndex.normal,
      props: { ...config.props, ...props },
    }));
    this.update();
  }

  // 关闭弹窗后的操作
  _afterClose(name, callback) {
    callback?.();
    // 弹窗关闭后删除
    this._removeModal(name);
    this.update();
  }

  // 隐藏后销毁指定的弹窗
  close(name) {
    const key = this.getKey(name);
    if (!key) return;
    const mounted = this.getMounted(key);
    if (mounted === false) return;
    if (this.getModalOpen(key)) {
      // 更新弹窗内的关闭后回调方法
      this.setModalConfig(key, { _readyClose: true });
      this.hide(key);
    } else {
      this.destroy(key);
    }
  }

  // 切换隐藏和打开弹窗
  toggle(name) {
    const key = this.getKey(name);
    if (!key) return;
    if (this.getModalOpen(key)) {
      this.hide(key);
    } else {
      this.open(key);
    }
  }

  // 销毁指定的弹窗
  destroy(name) {
    this._removeModal(name);
    this.update();
  }

  // 置顶指定的弹窗
  bringToTop(name) {
    const key = this.getKey(name);
    if (!key) return;

    this.modalList.forEach((item, _key) => {
      const focus = _key === key;
      if (item.focus !== focus) {
        const zIndex = focus ? this.modalZIndex.focus : this.modalZIndex.normal;
        this.setModalConfig(_key, { focus, zIndex });
      }
    });
    this.update();
  }

  // 获取当前创建的弹窗列表
  getTask() {
    return Array.from(this.modalList).map(([key, item]) => ({
      namespace: item.namespace,
      name: item.name,
      open: item.open,
      focus: item.focus,
      zIndex: item.zIndex,
      renderIndex: item.renderIndex,
      props: item.props,
      taskData: item.taskData,
      key,
    }));
  }

  // 获取渲染的弹窗
  getRenderModal() {
    const renderOuter = [];
    const renderInner = [];

    this.modalList.forEach((item, key) => {
      const { modalRef, ...attr } = item;
      const modalComp = this.container[item.type];

      if (!modalComp) {
        throw new Error('No modal type of ' + item.type + '!');
      }

      const [contentProps, modalProps] = separate(item.props, item.transfer);

      const content = React.createElement(
        ContentContext.Provider,
        // useModal 可以获取到的属性
        { value: { enable: true, ...item } },
        React.createElement(item.element, {
          ...contentProps,
          ...(item.ee ? { ee: item.ee } : {}),
        }),
      );

      // 弹窗组件内能获取到的属性和方法
      const _modalRef = Object.assign({}, item.modalRef, attr);

      const extraProps = item._readyClose
        ? {
            afterClose: () => this._afterClose(key, modalProps?.afterClose),
          }
        : {};

      const renderDom = React.createElement(
        modalComp,
        {
          ...modalProps,
          ...extraProps,
          open: item.open,
          modalRef: _modalRef,
          key,
        },
        content,
      );

      (!item.renderToCurrent ? renderOuter : renderInner).push(renderDom);
    });

    return [renderOuter, renderInner];
  }
}

export default ModalStore;
