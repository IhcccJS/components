---
title: 登录表单 Login
nav:
  title: 组件
  order: 2
group: 
  title: display
  order: 2
toc: content
---

# Login 登录表单

登录表单

## 基础使用

最简单的用法

<code src="./demo/LoginForm.jsx" background="#f1f1f1"></code>

授权操作

<code src="./demo/OauthButton.jsx" background="#f1f1f1"></code>

## Login.UserPasswordForm Props

用户名密码登录

| 名称    | 类型                   | 默认值      | 描述     |
| :------ | :--------------------- | :---------- | :------- |
| loading | `boolean`              | `undefined` | 加载状态 |
| size    | `small\|middle\|large` | `undefined` | 表单尺寸 |

## Login.EmailForm Props

邮箱验证码登录

| 名称      | 类型                   | 默认值      | 描述           |
| :-------- | :--------------------- | :---------- | :------------- |
| loading   | `boolean`              | `undefined` | 加载状态       |
| size      | `small\|middle\|large` | `undefined` | 表单尺寸       |
| timecount | `number`               | `undefined` | 验证码倒计时   |
| onSend    | `() => Promise<void>`  | `undefined` | 发送验证码事件 |

## Login.LoginForm Props

UserPasswordForm 和 EmailForm 属性的合集

## Login.OauthButton Props

列表

| 名称      | 类型                               | 默认值      | 描述             |
| :-------- | :--------------------------------- | :---------- | :--------------- |
| source    | `{ avatar: string, name: string }` | `undefined` | 授权平台信息     |
| target    | `{ avatar: string, name: string }` | `undefined` | 获取授权平台信息 |
| onConfirm | `Function`                         | `undefined` | 点击授权按钮事件 |
| onCancel  | `Function`                         | `undefined` | 点击取消按钮事件 |
