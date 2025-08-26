import React from 'react';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'listCustomRender',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    // TODO: 使用其他的属性进行自定义组件，children 会被传入暴露的参数进行业务操作；或者被弃用
    const { children } = props;

    const { request } = instance.getPlugin('request');
    const columnsTransform = instance.getPlugin('columnsTransform');

    if (!children) {
      throw new Error('Set children element to render list!');
    }

    const content = React.Children.toArray(children);

    return {
      children: React.cloneElement(content[0], {
        request,
        ...(!columnsTransform ? {} : { columns: columnsTransform.tableColumns.data }),
      }),
    };
  },
});
