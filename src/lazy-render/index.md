---
title: LazyRender
nav:
  title: 组件
  order: 2
group: 
  title: container
  order: 1
toc: content
---

# LazyRender 懒渲染组件

组件懒渲染，可视区域外的内容会在滚到可视区域范围内时，才被渲染出来

## 基础使用

<code src="./demo/basic" iframe="562"></code>

## 懒渲染列表

<code src="./demo/antd-list"></code>

## LazyRender Props

| 名称      | 类型       | 默认值      | 描述                                                                        |
| :-------- | :--------- | :---------- | :-------------------------------------------------------------------------- |
| disabled  | `boolean`  | `false`     | 是否禁用                                                                    |
| threshold | `number`   | `250`       | 进入可视区域触发回调的阈值，单位为像素                                      |
| onEnter   | `function` | `undefined` | 进入可视区域的回调。如果没有子元素，将会重复触发；如果有子元素，仅触发 1 次 |
| children  | `any`      | `undefined` | 进入可视区域才会渲染子组件                                                  |

## useLazyList <Badge>Hooks</Badge>

```js
const result = useLazyList(dataSource, config)
```

### params

| 名称         | 类型              | 默认值      | 描述                           |
| :----------- | :---------------- | :---------- | :----------------------------- |
| dataSource   | `number \| array` | `undefined` | 需要渲染的列表全部数据         |
| config.start | `number`          | `0`         | 默认渲染的数据长度             |
| config.step  | `number`          | `1`         | 每次触发进入事件，数据显示增量 |

> `config` 也可以传入 `LazyRender` 的参数配置

### result

| 名称       | 类型              | 描述                                     |
| :--------- | :---------------- | :--------------------------------------- |
| data       | `number \| array` | 当前渲染的列表                           |
| lazyFooter | `ReactNode`       | 懒渲染组件，需要放置在列表滚动区域最下面 |

> 此组件参考了 `antd mobile` 组件源码 [InfiniteScroll](https://github.com/ant-design/ant-design-mobile/blob/master/src/components/infinite-scroll/infinite-scroll.tsx)
