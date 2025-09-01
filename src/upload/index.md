---
title: Upload
nav:
  title: 组件
  order: 2
group: 
  title: input
  order: 3
toc: content
---

# Upload 上传组件

本组件和 Antd 上传组件有一些区别，它没有上传的功能，而是需要额外的方法进行上传，文件预览也做了一些封装

## 简单上手

<code src="./demo/base"></code>

## 图片上传

在多图片上传的时候需要根据具体情况手动的配置上传方法

```js
import { message } from 'antd';
import { Upload } from '@ihccc/components';

async function onSubmit({ images }) {
  const result = await Upload.multipleUpload(
    'http://xxxxxxxxxxx.com/base/file/upload',
    images,
    {
      format: (res) => res?.fileData,
    },
  );

  console.log('上传结果： ', result);
  message.success('👌 上传成功！');
}
```

## Upload Props

| 名称       | 类型                               | 默认值           | 描述                                                             |
| :--------- | :--------------------------------- | :--------------- | :--------------------------------------------------------------- |
| size       | `string`                           | `middle`         | 组件尺寸 （`small \| middle \| large`）                          |
| max        | `number`                           | `9`              | 选择文件最大数量                                                 |
| disabled   | `Boolean`                          | `undefined`      | 是否禁用                                                         |
| multiple   | `Boolean`                          | `false`          | 开启多选模式                                                     |
| removeAble | `Boolean`                          | `true`           | 是否允许删除已选择的文件                                         |
| value      | `array`                            | `[]`             | 值                                                               |
| onChange   | `function`                         | `undefined`      | 值改变时的回调事件                                               |
| preview    | `ReactNode`                        | `undefined`      | 可以自定义文件预览                                               |
| render     | `function(file: Upload.File): any` | `undefined`      | 用于各种文件的预览，例如显示 icon                                |
| children   | `ReactNode`                        | `<UploadCard />` | 选择文件触发组件，可以使用 `Upload.Trigger` 相关组件，支持自定义 |

> 更多配置 参考 [Antd Upload](https://ant.design/components/upload-cn/)

## Upload.File

`Upload.File` 是上传组件选择后获取到的值类型，它是对原生文件类型 `File` 的一个包装；也可以用来转换已经上传的文件；用来将已上传的文件和未上传的文件转换为同一类型，方便 `Upload` 组件进行统一处理。

`Upload.File` 实例 `new Upload.File(File)` 属性和方法

| 名称    | 类型                                        | 默认值       | 描述                                                    |
| :------ | :------------------------------------------ | :----------- | :------------------------------------------------------ |
| uid     | `string`                                    | `uuid`       | 选择的文件，自动生成的 id                               |
| name    | `string`                                    | `file.name`  | 文件名称                                                |
| type    | `string`                                    | `file.type`  | 文件类型                                                |
| extname | `string`                                    | `-`          | 文件后缀                                                |
| size    | `string`                                    | `-`          | 文件大小                                                |
| percent | `string`                                    | `-`          | 上传进度                                                |
| src     | `string`                                    | `-`          | 文件预览地址                                            |
| status  | `string`                                    | `not-upload` | 文件上传状态                                            |
| did     | `string`                                    | `-`          | 选择该文件的上传组件内部 id，用于索引组件，反馈上传进度 |
| init    | `function(source: file): Upload.File`       | `-`          | 初始化文件                                              |
| setSrc  | `function(src: string): Upload.File`        | `-`          | 设置文件预览路径                                        |
| getSrc  | `function(callback: function): Upload.File` | `-`          | 获取当前文件的预览地址                                  |
| update  | `function(percent: number): Upload.File`    | `-`          | 更新当前文件上传进度                                    |

`Upload.File` 静态方法

| 名称          | 类型                                | 默认值                                 | 描述                                     |
| :------------ | :---------------------------------- | :------------------------------------- | :--------------------------------------- |
| imageType     | `array`                             | `['png', 'jpg', 'gif', 'bmp', 'webp']` | `Upload.File` 判断文件是图片的扩展名列表 |
| is            | `function(file: any): boolean`      | `-`                                    | 判断数据是不是 `Upload.File` 类型        |
| formatPercent | `function(percent: number): number` | `-`                                    | 格式化上传进度数据                       |

eg:

如果想让上传后的文件正常预览，可以这样做：

```jsx | pure
const files = [new Upload.File({ src: '/path/file.png', name: '' })];

<Upload value={files} />;
```

## Upload.ImgCrop Props

| 名称          | 类型       | 默认值      | 描述                                                                                                           |
| :------------ | :--------- | :---------- | :------------------------------------------------------------------------------------------------------------- |
| aspect        | `number`   | `1`         | 图片裁切比例                                                                                                   |
| shape         | `string`   | `rect`      | 图片裁切形状 （`rect \| round`）                                                                               |
| grid          | `Boolean`  | `false`     | 是否显示网格                                                                                                   |
| quality       | `Boolean`  | `true`      | 是否允许调整质量（仅在 `Jpeg \| Webp` 格式下有效）                                                             |
| format        | `string`   | `auto`      | 图片格式（`false \| auto \| image/jpeg \| image/png \| image/webp` ），`false` 是不能调整，`auto` 是跟随源文件 |
| zoom          | `Boolean`  | `true`      | 是否允许缩放图片                                                                                               |
| rotate        | `Boolean`  | `false`     | 是否允许旋转图片                                                                                               |
| minZoom       | `number`   | `1`         | 最小缩放倍数                                                                                                   |
| maxZoom       | `number`   | `5`         | 最大缩放倍数                                                                                                   |
| fillColor     | `string`   | `white`     | 图片旋转裁切后，周围的填充色                                                                                   |
| maxResolution | `number`   | `960`       | 最大分辨率                                                                                                     |
| value         | `array`    | `[]`        | 值                                                                                                             |
| onChange      | `function` | `undefined` | 值改变时的回调事件                                                                                             |

> 更多配置 参考 [antd-img-crop](https://github.com/nanxiaobei/antd-img-crop) [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop)

## Upload.Trigger 组件

Upload.Trigger 是文件新增的显示组件，分为 `Upload.Trigger.Plus` 和 `Upload.Trigger.Normal`；

- Upload.Plus.Trigger Props

  | 名称        | 类型     | 默认值      | 描述     |
  | :---------- | :------- | :---------- | :------- |
  | title       | `string` | `undefined` | 显示标题 |
  | description | `string` | `undefined` | 显示描述 |

## Upload.Plus 组件

`Upload.Preview` 是文件预览组件，分为 `Upload.Preview.Plus` 和 `Upload.Preview.Normal`；另外的，提供了 `Upload.Preview.Status` 组件用于在自定义组件中方便的显示文件上传状态；

## Upload.multipleUpload Props <sup>New</sup>

支持在上传组件内显示上传进度的上传方法

`function multipleUpload(url: string, files: any, opts: object) : uploadResult[];`

| 名称  | 类型                | 默认值      | 描述     |
| :---- | :------------------ | :---------- | :------- |
| url   | `string`            | `undefined` | 上传接口 |
| files | `any \| array<any>` | `undefined` | 上传文件 |
| opts  | `object`            | `undefined` | 配置项   |

opts 配置项参数

| 名称         | 类型       | 默认值      | 描述                                         |
| :----------- | :--------- | :---------- | :------------------------------------------- |
| method       | `string`   | `POST`      | 请求类型                                     |
| data         | `object`   | `undefined` | 上传携带的其他数据                           |
| filename     | `string`   | `file`      | 上传文件在传输数据中的名称                   |
| headers      | `object`   | `undefined` | 上传头信息                                   |
| format       | `function` | `undefined` | 上传成功后格式化方法，返回假值就认为上传失败 |
| progressWait | `number`   | `33`        | 上传进度的节流控制时间                       |
| onProgress   | `function` | `undefined` | 上传进度回调，默认不需要处理                 |
