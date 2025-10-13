---
title: 介绍
nav:
  title: 组件
  order: 2
toc: content

apiHeader: false
---

不在此列表的组件可能会被移除，部分组件仍需完善

## 组件

- [x] [Access 权限控制](/components/access)
- [x] [BaseList 基础列表](/components/base-list)
  - [ ] [悬浮工具栏布局]
  - [ ] [搜索栏 + 功能按钮融合布局] 1：按钮收缩在搜索栏右侧一个小区域内，鼠标悬浮1秒向左展开，离开3秒收起，层级高于搜索栏；2：搜索栏收缩在左侧区域，鼠标悬浮1秒向下展开，且搜索按钮固定不变，离开3秒收起
  - [ ] [搜索栏可固定] position: sticky;
  - [ ] [瀑布流渲染插件]
  - [ ] [滚动请求插件]
  - [ ] [地图点位渲染插件] 需先开发地图相关组件
  - [ ] [列表项导航插件] 在列表左侧或右侧纵向显示最多20个状态点表示数据项，状态点颜色可表示数据状态，鼠标悬浮可显示数据项简单信息，点击状态点滚动到数据对应的区域并可高亮显示
- [x] [ButonList 按钮组](/components/button-list)
  - [ ] [垂直布局]
  - [ ] [折叠功能]
- [x] [Card 卡片](/components/card)
- [x] [CodeViewer 代码片段](/components/code-viewer)
- [ ] [Config 配置项](/components/config)
- [x] [Form 表单](/components/form)
- [x] [DataChecker 列表包裹组件](/components/data-checker)
- [x] [DataItem 数据项](/components/data-item)
- [x] [Detail 详情](/components/detail)
- [x] [Dialogue 对话列表](/components/dialogue)
- [x] [EditTable 编辑表格](/components/edit-table)
- [x] [Feature 状态特征](/components/feature)
- [x] [FoldSide 折叠侧边栏](/components/fold-side)
- [x] [Grid 网格布局](/components/grid)
- [x] [Image 图片](/components/image)
  - [ ] [懒加载] 不在视口的图片不加载和渲染
- [ ] [LazyRender 懒加载]
- [x] [ListItem 列表项](/components/list-item)
- [x] [Login 登录表单](/components/login)
- [x] [Markdown markdown 内容渲染](/components/markdown)
- [x] [Popup 弹出层](/components/popup)
- [x] [Popuper 弹出层管理](/components/popuper)
- [ ] [PageResize 页面兼容](/components/page-resize)
- [x] [RichEditor 富文本编辑器](/components/rich-editor)
- [ ] [Setting 用户系统设置](/components/setting)
- [x] [Select 选择，这是一系列组件的合集，可以直接调用配置好的数据选项](/components/select)
- [x] [Text 文本](/components/text)
- [ ] [Theme 主题切换](/components/theme)
- [ ] [Tour 用户引导](/components/tour)
- [ ] [TransitionRoute 路由动画](/components/transition-route)
- [x] [Upload 上传](/components/upload)
- [ ] WaterFall 瀑布流列表
- [ ] MapL7 l7 地图渲染
  - 加载互联网底图、离线底图、无底图渲染
  - 点（图标、文本、dom）近万的大数据量渲染，支持报警点动画，点聚合
  - 线、流线、飞线、轨迹动画播放渲染
  - 面、围栏渲染
  - 支持点线面编辑
  - 支持点击、悬浮事件

## 方法

- [ ] [columnsHelper `columns` 配置转换方法]
- [ ] [createComponent 插件式创建组件]
- [ ] [register 注册表单等组件或配置项]
- [ ] [setOptions 设置选择组件选项数据]
- [ ] [showOptions 返回设置的选项列表]

## hooks

- [ ] [useOptions 调用选项数据]
