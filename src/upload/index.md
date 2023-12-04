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

```jsx
import React from 'react';
import { Space, Button, message } from 'antd';
import { Upload } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

function Demo() {
  const [value, setValue] = React.useState([]);

  const handleUpload = async () => {
    const hide = message.loading('上传中...', 0);
    const res = await Upload.multipleUpload(
      'http://localhost:5000/base/files/upload',
      value,
      {
        // format: res => res.data
      },
    );
    hide();
    console.log('结果：', res);
  };

  console.log('value：', value);

  return (
    <Space direction="vertical">
      <Upload multiple value={value} onChange={setValue} />
      <Button onClick={handleUpload}>开始上传</Button>
    </Space>
  );
}

export default Demo;
```

## 简单示例

```jsx
import React from 'react';
import { Upload } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

function Demo() {
  const [value, setValue] = React.useState([
    new Upload.File({ src: 'https://picsum.photos/400?t=1.png', type: 'image' }),
    new Upload.File({ src: 'https://picsum.photos/400?t=2.png', type: 'image' }),
    new Upload.File({ src: 'https://picsum.photos/400?t=3.png', type: 'image' }),
    new Upload.File({ src: 'https://picsum.photos/400?t=4.png', type: 'image' }),
  ]);

  console.log(value);

  return (
    <Upload
      max={4}
      multiple
      value={value}
      preview={
        <Upload.Preview.Normal
          progressProps={{ type: 'line', showInfo: false }}
        />
      }
      onChange={setValue}
    />
  );
}

export default Demo;
```

## 大尺寸显示

```jsx
import React from 'react';
import { Upload } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

function Demo() {
  const [value, setValue] = React.useState([
    new Upload.File({ src: 'https://picsum.photos/400?t=1.png', type: 'image' }),
    new Upload.File({ src: 'https://picsum.photos/400?t=2.png', type: 'image' }),
    new Upload.File({ src: 'https://picsum.photos/400?t=3.png', type: 'image' }),
    new Upload.File({ src: 'https://picsum.photos/400?t=4.png', type: 'image' }),
  ]);

  console.log(value);

  return (
    <Upload
      multiple
      value={value}
      onChange={setValue}
      preview={<Upload.Preview.Plus />}
      style={{ width: 500, flexDirection: 'column-reverse' }}
    >
      <Upload.Trigger.Plus />
    </Upload>
  );
}

export default Demo;
```

## 自定义显示

```jsx
import React from 'react';
import { PaperClipOutlined, FileUnknownOutlined } from '@ant-design/icons';
import { Upload } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

// isImage 文件是否是图片
// extname 文件扩展名
const uploadRender = ({ isImage, extname }) => {
  // 如果是图片，return false; 图片的预览会在内部自动处理
  // 其他的文件类型，预览形式需要自己做判断
  if (isImage) return false;
  const fileIcon = {
    pdf: <p>PDF 文件</p>,
  }[extname] || <FileUnknownOutlined />;
  return <div style={{ fontSize: 36 }}>{fileIcon}</div>;
};

function Demo() {
  const [value, setValue] = React.useState([
    new Upload.File({ src: 'https://picsum.photos/400?t=1.png', type: 'image' }),
  ]);

  console.log(value);

  return (
    <Upload
      multiple
      value={value}
      onChange={setValue}
      preview={<Upload.Preview.Plus />}
      render={uploadRender}
      style={{ width: 500, flexDirection: 'column-reverse' }}
    >
      <p>
        <PaperClipOutlined /> 添加附件
        <span style={{ marginLeft: 4, color: '#c9c9c9' }}>
          （单文件最大 2MB）
        </span>
      </p>
    </Upload>
  );
}

export default Demo;
```

## 自定义预览

```jsx
import React from 'react';
import {
  FileTextOutlined,
  FileExcelOutlined,
  FileZipOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';
import { Upload } from '@ihccc/components';
import '@ihccc/components/lib/style/color.less';

const uploadRender = ({ isImage, extname }) => {
  if (isImage) return false;
  const fileIcon = {
    txt: <FileTextOutlined />,
    xlsx: <FileExcelOutlined />,
    zip: <FileZipOutlined />,
    html: <span style={{ fontSize: 16, fontWeight: 'bold' }}>html 网页</span>,
    js: <span style={{ fontSize: 16, fontWeight: 'bold' }}>Js 脚本文件</span>,
  }[extname] || <FileUnknownOutlined />;
  return <div style={{ fontSize: 36 }}>{fileIcon}</div>;
};

function Demo() {
  const [value, setValue] = React.useState([]);

  console.log(value);

  return (
    <Upload multiple value={value} onChange={setValue} render={uploadRender} />
  );
}

export default Demo;
```

## 使用图片裁切

裁切的功能也是根据 Antd 官网的裁切 demo 的组件 `antd-img-crop` 进行修改而来的

```jsx
import React from 'react';
import { Upload } from '@ihccc/components';

function Demo() {
  const [value, setValue] = React.useState([]);

  console.log(value);

  return (
    <Upload.ImgCrop rotate value={value} onChange={setValue}>
      <Upload size="small" />
    </Upload.ImgCrop>
  );
}

export default Demo;
```

## 仅一张图片模式

如果上传组件的 `max={1}` 并且 `value` 不是数组的情况下，将开启单图片模式，即组件获取的值将仅仅是一个文件，不是文件数组

```jsx
import React from 'react';
import { Upload } from '@ihccc/components';

function Demo() {
  const [value, setValue] = React.useState(
    new Upload.File({ src: 'https://picsum.photos/400?t=1.png', type: 'image' }),
  );

  console.log(value);

  return (
    <Upload.ImgCrop rotate value={value} onChange={setValue}>
      <Upload max={1} size="small" />
    </Upload.ImgCrop>
  );
}

export default Demo;
```

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
| preview    | `ReactNode`                        | `undefined`      | 文件预览，可以使用 `Upload.Preview` 相关组件，可以自定义         |
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

- Upload.Trigger.Plus Props

  | 名称        | 类型     | 默认值      | 描述     |
  | :---------- | :------- | :---------- | :------- |
  | title       | `string` | `undefined` | 显示标题 |
  | description | `string` | `undefined` | 显示描述 |

## Upload.Preview 组件

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
