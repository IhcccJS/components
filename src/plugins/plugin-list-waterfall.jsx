import React from 'react';
import Waterfall from '@/components/@dev/waterfall';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'listWaterfall',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    const { waterfall: waterfallProps = {} } = props;

    const { request } = instance.getPlugin('request');
    // const { tableColumns } = instance.getPlugin('columnsTransform');
    // const listScroll = instance.getPlugin('listScrollHeight');
    // const buttonExpandAble = instance.getPlugin('buttonExpandAble');

    const content = <Waterfall {...waterfallProps} dataSource={request.data.list} />;

    return { children: content };
  },
});
