import React from 'react';
import {
  PlusOutlined,
  ReloadOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  CheckCircleOutlined,
  // QuestionCircleOutlined,
  // TableOutlined,
  // UnorderedListOutlined,
} from '@ant-design/icons';
import { isFunction /** isObject */ } from '@ihccc/utils';
import ButtonList from '../button-list';
import useStyles from './style';

const ButtonRenderSort = [
  'help',
  'refresh',
  'fullScreen',
  'columnsEditor',
  'tableRender',
  'listRender',
  'create',
];

const FunctionButton = (props) => {
  const { title, behaviors = {}, buttons, buttonConfig, eventMap } = props;
  const { styles, cx } = useStyles();

  const margeButtons = React.useMemo(() => {
    const items = {
      // help: {
      //   key: 'help',
      //   tip: '帮助',
      //   space: 'none',
      //   props: {
      //     type: 'link',
      //     icon: <QuestionCircleOutlined />,
      //     children: '遇到问题了？',
      //   },
      // },
      refresh: {
        key: 'refresh',
        tip: '刷新',
        props: { type: 'dashed', icon: <ReloadOutlined /> },
      },
      fullScreen: {
        key: 'fullScreen',
        tip: ({ fullScreen }) => (fullScreen ? '退出全屏' : '全屏'),
        props: ({ fullScreen }) => ({
          type: 'dashed',
          icon: fullScreen ? (
            <FullscreenExitOutlined />
          ) : (
            <FullscreenOutlined />
          ),
        }),
      },
    };

    if (!!behaviors.columnsEditor) {
      items['columnsEditor'] = {
        key: 'columnsEditor',
        tip: '数据显示设置',
        props: { type: 'dashed', icon: <CheckCircleOutlined /> },
      };
    }

    // items['tableRender'] = {
    //   key: 'tableRender',
    //   group: 'renderType',
    //   tip: '表格',
    //   props: { type: 'primary', icon: <TableOutlined /> },
    // };
    // items['listRender'] = {
    //   key: 'listRender',
    //   group: 'renderType',
    //   tip: '列表',
    //   props: { type: 'dashed', icon: <UnorderedListOutlined /> },
    // };

    if (!!behaviors.create) {
      items['create'] = {
        key: 'create',
        props: { type: 'primary', icon: <PlusOutlined />, children: '新增' },
      };
    }

    const buttonList = ButtonRenderSort.map((key) => items[key]).filter(
      (btn) => !!btn,
    );

    if (isFunction(buttons)) {
      return buttons({ buttons: items, list: buttonList });
    }

    if (!buttons || buttons.length === 0) return buttonList;

    return buttonList.concat(buttons);
  }, [behaviors, buttons]);

  return (
    <div className={cx(styles, 'bc-function-bar')}>
      <div className="bc-function-title">{title}</div>
      <ButtonList
        access="functionButtons"
        type="button"
        layout="end"
        {...buttonConfig}
        eventMap={{ ...eventMap, ...buttonConfig.eventMap }}
        buttons={margeButtons}
      />
    </div>
  );
};

export default FunctionButton;
