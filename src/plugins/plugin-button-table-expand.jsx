import React from 'react';
import { ColumnHeightOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import definePlugin from '../create-component/definePlugin';
const expandAllKeys = (list, rowKey) => {
  return (list || []).map((item) => item[rowKey]);
};

const expandSomeKeys = (list, rowKey) => {
  return (list || []).filter((item) => item.deep < 2).map((item) => item[rowKey]);
};

export default definePlugin({
  name: 'buttonTableExpand',
  priority: 'CONTENT',
  props: ['buttonEnabled'],
  before(_, props) {
    const { buttonEnabled = {} } = props;

    if (buttonEnabled.expandAble === false) return;

    return {
      button: [
        {
          key: 'expandSome',
          group: 'expand',
          tip: '展开部分',
          props: ({ expandType }) => ({
            type: expandType === 'some' ? 'primary' : 'dashed',
            icon: <VerticalAlignBottomOutlined />,
          }),
          sort: 100,
        },
        {
          key: 'expandAll',
          group: 'expand',
          tip: '展开全部',
          props: ({ expandType }) => ({
            type: expandType === 'all' ? 'primary' : 'dashed',
            icon: <ColumnHeightOutlined />,
          }),
          sort: 100,
        },
        {
          key: 'expandNone',
          group: 'expand',
          tip: '折叠全部',
          props: ({ expandType }) => ({
            type: expandType === 'none' ? 'primary' : 'dashed',
            icon: <VerticalAlignMiddleOutlined />,
          }),
          sort: 100,
        },
      ],
    };
  },
  main(_, props) {
    const { buttonEnabled = {}, expandable, table = {}, rowKey: _rowKey = 'key' } = props;

    if (buttonEnabled.refresh === false) return;

    const rowKey = _rowKey || table.rowKey || 'key';

    const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);
    const [expandType, setExpandType] = React.useState(expandable?.type || 'none');

    const onExpand = (expanded, record) => {
      if (expanded) {
        setExpandedRowKeys((keys) => keys.concat(record[rowKey]));
      } else {
        setExpandedRowKeys((keys) => keys.filter((key) => key !== record[rowKey]));
      }
    };

    if (buttonEnabled.expandAble === false) {
      return { expandable: {} };
    }

    return {
      expandable: {
        ...expandable,
        expandedRowKeys,
        onExpand,
      },

      data: { expandType, setExpandType, expandedRowKeys, setExpandedRowKeys },

      event: {
        expandSome: ({ request }) => {
          const keys = expandSomeKeys(request.data?.list, rowKey);
          setExpandedRowKeys(keys);
          setExpandType('some');
        },
        expandAll: ({ setExpandType, request }) => {
          const keys = expandAllKeys(request.data?.list, rowKey);
          setExpandedRowKeys(keys);
          setExpandType('all');
        },
        expandNone: () => {
          setExpandedRowKeys([]);
          setExpandType('none');
        },
      },
      expose: { name: 'expand', source: 'data' },
    };
  },
});
