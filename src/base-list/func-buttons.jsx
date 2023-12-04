import React from 'react';
import {
  PlusOutlined,
  ReloadOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import ButtonList from '../button-list';
import useStyles from './style';

const FunctionButton = (props) => {
  const {
    title,
    loading,
    behaviors = {},
    extraButtons,
    eventEmitter,
    buttonConfig,
    onRefresh,
    fullScreen,
    onFullScreen,
  } = props;
  const { styles, cx } = useStyles();

  const buttons = React.useMemo(() => {
    const items = {
      refresh: {
        key: 'refresh',
        tip: '刷新',
        props: { type: 'dashed', icon: <ReloadOutlined /> },
        onClick: onRefresh,
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
        onClick: onFullScreen,
      },
    };

    if (!!behaviors.columnsEditor) {
      items.columnsEditor = {
        key: 'columnsEditor',
        tip: '数据显示设置',
        props: { type: 'dashed', icon: <CheckCircleOutlined /> },
        onClick: ({ eventEmitter }) => {
          eventEmitter.emit('popup', { type: 'columnsEditor' });
        },
      };
    }

    if (!!behaviors.create) {
      items.create = {
        key: 'create',
        props: { type: 'primary', icon: <PlusOutlined />, children: '新增' },
        onClick: ({ eventEmitter, loading }) => {
          eventEmitter.emit('popup', {
            type: 'create',
            loading: loading?.create || loading?.update || false,
          });
        },
      };
    }

    (extraButtons || []).forEach((btn) => {
      items[btn.key] = Object.assign({}, items[btn.key], btn);
    });

    return Object.keys(items).map((key) => items[key]);
  }, [onRefresh, onFullScreen, behaviors, extraButtons]);

  return (
    <div className={cx(styles, 'bc-function-bar')}>
      <div className="bc-function-title">{title}</div>
      <ButtonList
        access="functionButtons"
        type="button"
        layout="end"
        {...buttonConfig}
        buttons={buttons}
        data={{ ...buttonConfig?.data, fullScreen, loading, eventEmitter }}
      />
    </div>
  );
};

export default FunctionButton;
