import React from 'react';
import { TableOutlined, CreditCardOutlined } from '@ant-design/icons';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'buttonSwitchRender',
  priority: 'CONTENT',
  props: [],
  before() {
    return {
      button: [
        {
          key: 'tableRender',
          tip: '表格',
          group: 'renderType',
          props: ({ renderType }) => ({
            type: renderType === 'table' ? 'primary' : 'dashed',
            icon: <TableOutlined />,
          }),
        },
        {
          key: 'cardRender',
          tip: '卡片',
          group: 'renderType',
          props: ({ renderType }) => ({
            type: renderType === 'card' ? 'primary' : 'dashed',
            icon: <CreditCardOutlined />,
          }),
        },
      ],
    };
  },
  main(instance, props) {
    const { switchRender = {}, buttonEnabled = {} } = props;
    // const listScroll = instance.getPlugin('listScrollHeight');

    // #TODO: 应该再判断有没有设置 table 和 list 相关属性
    const [renderType, setRenderType] = React.useState(switchRender.defaultRenderType || 'table');

    if (buttonEnabled.switchRender === false) {
      return { name: 'buttonSwitchRender', renderType };
    }

    return {
      renderType,

      eventData: { renderType },

      eventMap: {
        // tableRender: ({ fullScreenClassName, isFullscreen }) => {
        tableRender: () => {
          setRenderType('table');
          // if (!listScroll) return;
          // listScroll.countHeight(isFullscreen ? fullScreenClassName : void 0);
        },
        // cardRender: ({ fullScreenClassName, isFullscreen }) => {
        cardRender: () => {
          setRenderType('card');
          // if (!listScroll) return;
          // listScroll.countHeight(isFullscreen ? fullScreenClassName : void 0);
        },
      },
    };
  },
});
