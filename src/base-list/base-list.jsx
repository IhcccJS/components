import React from 'react';
import { Table, Form } from 'antd';
import { useControllableValue } from 'ahooks';
import { isString, isObject, isFunction, isUndefined } from '@ihccc/utils';
import useFullscreen from './hooks/useFullscreen';
import useMergeColumns from './columns-editor/useMergeColumns';
import Wrapper from './wrapper';
import FuncButtons from './func-buttons';
import PopupRender from './popup-render';
import ColumnsEditorModal from './columns-editor/modal';
import useEvent from './hooks/useEvent';
import columnsHelper from '../columns-helper';
import { renderSetter } from './setter';

const defaultPageSizeOptions = ['10', '20', '50', '100', '200'];

const defaultEventMap = {
  refresh: ({ ee }) => ee.emit('refresh'),
  fullScreen: ({ ee }) => ee.emit('fullScreen'),
  columnsEditor: ({ ee }) => ee.emit('popup', { type: 'columnsEditor' }),
  create: ({ ee, loading }) =>
    ee.emit('popup', {
      type: 'create',
      loading: loading?.create || loading?.update || false,
    }),
};

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
    eventData,
    eventMap,
    children,
    ...restProps
  } = props;
  const { namespace, loading, defaultParams, params, data } = state;

  const [searchForm] = Form.useForm();

  const { eventEmitter, eventHandler } = useEvent(namespace);

  const [fullScreen, setFullScreen] = useControllableValue(props, {
    defaultValuePropName: 'defaultFullScreen',
    defaultValue: false,
    valuePropName: 'fullScreen',
    trigger: 'onFullScreen',
  });
  const defaultFullScreenRef = React.useRef();
  useFullscreen(fullScreen, fullScreenRef || defaultFullScreenRef);

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

  const _eventData = {
    ...eventData,
    ...extraButtonConfig?.data,
    fullScreen,
    loading,
    ee: eventEmitter,
  };

  const _eventMap = {
    ...defaultEventMap,
    ...eventHandler,
    ...eventMap,
  };

  // 权限过滤，visible 过滤
  const accessFilterColumns = columnsHelper.useColumnsAccess(
    columns,
    Object.assign(
      { handler: 'baseList' },
      isString(access) ? { name: access } : access,
    ),
  );
  // 用户配置过滤
  const mergeColumns = useMergeColumns(
    accessFilterColumns.passedData,
    columnsEditor,
  );
  // 进行列表配置转换
  const tableColumns = columnsHelper.useColumnsTransform(mergeColumns.columns, {
    name: name || 'list',
    isList: true,
    showIndex: showIndex === 'order' ? data?.page : showIndex,
    actions: actionColumn,
    eventData: _eventData,
    eventMap: _eventMap,
  });

  const { _popups, _behaviors } = React.useMemo(() => {
    const _popups = [...(popups || [])];
    const _behaviors = {};
    if (!!columnsEditor) {
      const { saveName, ...config } = columnsEditor;
      _popups.push(
        <ColumnsEditorModal
          {...config}
          defaultValue={mergeColumns.columns}
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
  }, [popups, behaviors, mergeColumns.source]);

  // 查询组件（新）
  const searchElement = React.useMemo(() => {
    return (
      searchRender &&
      searchRender({
        namespace,
        form: searchForm,
        initialValues: {
          ...defaultParams,
          ...searcher?.props?.initialValues,
        },
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
    searchForm.setFieldsValue(params);
    const isEmptyList = data.list.length === 0;
    autoRequest && isEmptyList && __handle_query__();
    if (eventEmitter) {
      eventEmitter.on('fullScreen', () =>
        setFullScreen((fullScreen) => !fullScreen),
      );
      eventEmitter.on('page', __handle_page__);
      eventEmitter.on('refresh', __handle_query__);
      eventEmitter.on('search', __handle_search__);
      eventEmitter.on('submit', __handle_submit__);
      Object.keys(action).forEach((key) =>
        eventEmitter.on(`action/${key}`, action[key]),
      );

      return () => {
        eventEmitter.off('fullScreen');
        eventEmitter.off('page');
        eventEmitter.off('refresh');
        eventEmitter.off('search');
        eventEmitter.off('submit');
        Object.keys(action).forEach((key) => eventEmitter.off(`action/${key}`));
      };
    }
  }, []);

  const renderDom = (
    <React.Fragment>
      <PopupRender
        namespace={namespace}
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
            title={title}
            behaviors={_behaviors}
            buttons={extraButtons}
            buttonConfig={{ ...extraButtonConfig, data: _eventData }}
            eventMap={_eventMap}
          />
        ),
        React.isValidElement(children) &&
          React.cloneElement(
            children,
            Object.assign(restProps, {
              loading: loading?.query || loading?.remove,
              dataSource: data.list || [],
              columns: tableColumns,
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
