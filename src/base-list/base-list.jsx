import React from 'react';
import { Table } from 'antd';
import { useControllableValue } from 'ahooks';
import { isString, isObject, isFunction, isUndefined } from '@ihccc/utils';
import useFullscreen from './hooks/useFullscreen';
import useMergeColumns from './columns-editor/useMergeColumns';
import Wrapper from './wrapper';
import FuncButtons from './func-buttons';
import PopupRender from './popup-render';
import ColumnsEditorModal from './columns-editor/modal';
import columnsHelper from '../columns-helper';
import { renderSetter } from './setter';

const defaultPageSizeOptions = ['10', '20', '50', '100', '200'];

const BaseList = React.memo(function (props) {
  const {
    access,
    name,
    title,
    showIndex,
    columns,
    actionColumn,
    columnsEditor,
    fullScreenRef,
    pagination,
    extraButtons,
    extraButtonConfig,
    searcher,
    searchRender,
    behaviors,
    popups,
    wrapper,
    autoRequest,
    state,
    action,
    eventEmitter,
    children,
    ...restProps
  } = props;
  const { loading, data, defaultParams } = state;
  const [fullScreen, setFullScreen] = useControllableValue(props, {
    defaultValuePropName: 'defaultFullScreen',
    defaultValue: false,
    valuePropName: 'fullScreen',
    trigger: 'onFullScreen',
  });
  const defaultFullScreenRef = React.useRef();
  useFullscreen(fullScreen, fullScreenRef || defaultFullScreenRef);

  const tableColumns = columnsHelper.useColumns(columns, {
    access: Object.assign(
      { handler: 'baseList' },
      isString(access) ? { name: access } : access,
    ),
    name: name || 'list',
    isList: true,
    showIndex: showIndex === 'order' ? data?.page : showIndex,
    actions: actionColumn,
  });

  const mergeColumns = useMergeColumns(tableColumns, columnsEditor);

  // 基础查询
  const __handle_query__ = React.useCallback(
    async (params) => isFunction(action.query) && (await action.query(params)),
    [],
  );

  // 搜索查询
  const __handle_search__ = React.useCallback(
    async (values) =>
      await __handle_query__(Object.assign(values, { pageNumber: 1 })),
    [],
  );

  // 页面切换
  const __handle_page__ = React.useCallback(
    async (pageNumber, pageSize) =>
      await __handle_query__({ pageNumber, pageSize }),
    [],
  );

  // 提交数据
  const __handle_submit__ = React.useCallback(
    async (value, type) =>
      isFunction(action[type]) && (await action[type](value)),
    [action],
  );

  const { _popups, _behaviors } = React.useMemo(() => {
    const _popups = [...(popups || [])];
    const _behaviors = {};
    if (!!columnsEditor) {
      const { saveName, ...config } = columnsEditor;
      _popups.push(
        <ColumnsEditorModal
          {...config}
          defaultValue={tableColumns}
          value={mergeColumns.source}
          onOk={mergeColumns.save}
          key="columnsEditor"
        />,
      );
    }
    _popups.forEach((item) => {
      if (!_behaviors.hasOwnProperty(item.key)) {
        _behaviors[item.key] = item.key;
      }
    });
    return { _popups, _behaviors: { ..._behaviors, ...behaviors } };
  }, [popups, behaviors, tableColumns, mergeColumns.source]);

  // 查询组件（新）
  const searchElement = React.useMemo(() => {
    return (
      searchRender &&
      searchRender({
        initialValues: searcher?.props?.initialValues || defaultParams,
        columns: mergeColumns.columns,
        loading: loading?.query,
        onSubmit: __handle_search__,
      })
    );
  }, [searchRender, mergeColumns.columns]);

  // 查询组件
  const searcherElement = React.useMemo(
    () =>
      React.isValidElement(searcher) &&
      React.cloneElement(searcher, {
        initialValues: searcher?.props?.initialValues || defaultParams,
        loading: loading?.query,
        onSubmit: __handle_search__,
      }),
    [loading?.query, __handle_search__],
  );

  // 分页配置
  const getPagination = React.useCallback(
    (total, page) => {
      if (isObject(pagination) || isUndefined(pagination)) {
        return Object.assign(
          {
            total: /\d+/.test(total) ? +total : 0,
            size: restProps.size,
            showSizeChanger: true,
            showQuickJumper: true,
            current: page?.pageNumber,
            pageSize: page?.pageSize,
            pageSizeOptions: defaultPageSizeOptions,
            onChange: __handle_page__,
            onShowSizeChange: __handle_page__,
            showTotal: (total) => `总计 ${total} 条`,
          },
          pagination,
        );
      }
      return false;
    },
    [pagination],
  );

  React.useEffect(() => {
    autoRequest && __handle_query__();
    if (eventEmitter) {
      eventEmitter.on('fullScreen', setFullScreen);
      eventEmitter.on('page', __handle_page__);
      eventEmitter.on('search', __handle_search__);
      eventEmitter.on('submit', __handle_submit__);
      Object.keys(action).forEach((key) =>
        eventEmitter.on(`action/${key}`, action[key]),
      );

      return () => {
        eventEmitter.off('fullScreen');
        eventEmitter.off('page');
        eventEmitter.off('search');
        eventEmitter.off('submit');
        Object.keys(action).forEach((key) => eventEmitter.off(`action/${key}`));
      };
    }
  }, []);

  const renderDom = (
    <React.Fragment>
      <PopupRender
        loading={loading}
        action={action}
        behaviors={_behaviors}
        popups={_popups}
        eventEmitter={eventEmitter}
        onSubmit={__handle_submit__}
      />
      {searchElement}
      {searcherElement}
      {React.createElement(
        wrapper,
        { className: 'bc-wrapper-style' },
        extraButtons === false ? null : (
          <FuncButtons
            loading={loading}
            title={title}
            behaviors={_behaviors}
            extraButtons={extraButtons}
            buttonConfig={extraButtonConfig}
            fullScreen={fullScreen}
            onFullScreen={() => setFullScreen((fullScreen) => !fullScreen)}
            onRefresh={() => __handle_query__()}
            eventEmitter={eventEmitter}
          />
        ),
        React.isValidElement(children) &&
          React.cloneElement(
            children,
            Object.assign(restProps, {
              loading: loading?.query || loading?.remove,
              dataSource: data.list || [],
              columns: mergeColumns.columns,
              pagination: getPagination(data.total, data.page || {}),
            }),
          ),
      )}
    </React.Fragment>
  );

  return !fullScreenRef ? (
    <div ref={defaultFullScreenRef}>{renderDom}</div>
  ) : (
    renderDom
  );
});

BaseList.defaultProps = {
  state: {},
  action: {},
  autoRequest: true,
  showIndex: true,
  size: 'small',
  wrapper: Wrapper,
  children: <Table scroll={{ x: 'max-content' }} rowKey="id" />,
};

BaseList.render = renderSetter;

export default BaseList;
