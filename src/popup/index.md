---
title: Popup 弹出层
nav:
  title: 组件
  order: 2
group:
  title: display
  order: 2
toc: content
---

# Popup 弹出层

## 简单上手

<code src="./demo/base"></code>

## Popup Props

| 名称           | 类型                            | 默认值      | 描述                                               |
| :------------- | :------------------------------ | :---------- | :------------------------------------------------- |
| id             | `string`                        | `undefined` | 弹出层 Dom元素 `id`                                |
| open           | `string`                        | `undefined` | 打开状态                                           |
| top            | `number\|string`                | `100`       | 弹窗距离顶部的距离                                 |
| width          | `number\|string`                | `520`       | 宽度                                               |
| zIndex         | `number`                        | `undefined` | 弹出层的 `z-index`                                 |
| title          | `any`                           | `undefined` | 标题                                               |
| extra          | `any`                           | `undefined` | 关闭按钮左侧区域内容                               |
| header         | `any`                           | `undefined` | 自定义渲染顶栏区域内容                             |
| extraButton    | `TButtonList`                   | `undefined` | 顶栏按钮配置                                       |
| footer         | `any`                           | `undefined` | 自定义渲染顶底栏区域内容                           |
| footerButton   | `TButtonList`                   | `undefined` | 底栏按钮配置                                       |
| children       | `any`                           | `undefined` | 弹出层内容                                         |
| mask           | `boolean`                       | `undefined` | 是否显示遮罩                                       |
| cancelMask     | `boolean`                       | `undefined` | 遮罩是否可点击，取消后点击弹窗外区域可触发页面事件 |
| destroyOnClose | `string`                        | `undefined` | 关闭时销毁内容                                     |
| classNames     | `TClassNames`                   | `undefined` | 样式类集合                                         |
| styles         | `TStyles`                       | `undefined` | 内联样式集合                                       |
| afterClose     | `() => any`                     | `undefined` | 完全关闭回调                                       |
| popupRef       | `string`                        | `undefined` | 唯一的索引                                         |
| popupRender    | `(popupNode: ReactNode) => any` | `undefined` | 弹出层渲染                                         |
| onHide         | `() => any`                     | `undefined` | 隐藏按钮触发回调，不传隐藏缩小按钮                 |
| onCancel       | `() => any`                     | `undefined` | 关闭弹出层触发回调，不传隐藏缩关闭按钮和取消按钮   |
| onOk           | `() => any`                     | `undefined` | 确认按钮触发回调，不传隐藏确认按钮                 |
| onPopupClick   | `() => any`                     | `undefined` | 弹出层区域点击回调                                 |


## Popup.Dragable Props

| 名称            | 类型      | 默认值                  | 描述             |
| :-------------- | :-------- | :---------------------- | :--------------- |
| dragAble        | `boolean` | `true`                  | 是否允许拖拽     |
| handleClassName | `string`  | `bc-popup-drag-handler` | 拖拽区域样式类名 |

### 特别类型

TClassNames

```ts
type TClassNames = {
  // 根元素
  root?: string;
  // 弹出层
  main?: string;
  // 弹出层内容
  content?: string;
  // 标题
  title?: string;
}
```

TStyles

```ts
type TStyles = {
  // 根元素
  root?: ElementCSSInlineStyle;
  // 遮罩
  mask?: ElementCSSInlineStyle;
  // 弹出层
  main?: ElementCSSInlineStyle; // 旧称 popup
  // 内容顶部
  header?: ElementCSSInlineStyle;
  // 内容主体
  body?: ElementCSSInlineStyle;
  // 内容底部
  footer?: ElementCSSInlineStyle;
}
```

## todo

- 移除默认的最小化按钮，放到 Internal 实现
- 统一 TClassNames 和 TStyles 配置项
- 实现 antd modal 类似的打开关闭动画
