import React from 'react';
import {
  RedoOutlined,
  SearchOutlined,
  CheckOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import ButtonList from '../button-list';
import Item from './item';

export const Base = (props) => {
  const {
    loading,
    resetAble = true,
    submitText,
    buttonConfig,
    ...restProps
  } = props;

  const buttons = React.useMemo(() => {
    const initButtons = !resetAble
      ? []
      : [
          {
            key: 'reset',
            props: {
              icon: <RedoOutlined />,
              htmlType: 'reset',
              children: '重置',
            },
          },
        ];

    return initButtons.concat({
      key: 'submit',
      props: ({ submitText, loading }) => ({
        loading,
        type: 'primary',
        icon: <CheckOutlined />,
        htmlType: 'submit',
        children: submitText || '提交',
      }),
    });
  }, [resetAble]);

  return (
    <Item {...restProps}>
      <ButtonList
        access={false}
        type="button"
        {...buttonConfig}
        buttons={buttons}
        data={{ submitText, loading }}
      />
    </Item>
  );
};

export const Search = (props) => {
  const {
    loading,
    full,
    important,
    fold,
    onFold,
    foldAble = true,
    resetAble = true,
    buttonConfig,
    ...restProps
  } = props;

  const buttons = React.useMemo(() => {
    let items = !foldAble
      ? []
      : [
          {
            key: 'fold',
            props: ({ fold }) => ({
              type: 'link',
              icon: fold ? <DownOutlined /> : <UpOutlined />,
              children: fold ? '展开' : '收起',
            }),
            onClick: onFold,
          },
        ];

    items.push({
      key: 'search',
      group: 'group',
      props: ({ loading }) => ({
        loading,
        type: 'primary',
        icon: <SearchOutlined />,
        htmlType: 'submit',
        children: '查询',
      }),
    });

    if (resetAble) {
      items.push({
        key: 'reset',
        group: 'group',
        props: { htmlType: 'reset', children: '重置' },
      });
    }

    return items;
  }, [foldAble, resetAble, onFold]);

  return (
    <Item {...restProps}>
      <ButtonList
        access={false}
        type="button"
        space="none"
        layout="end"
        {...buttonConfig}
        buttons={buttons}
        data={{ fold, loading }}
      />
    </Item>
  );
};
