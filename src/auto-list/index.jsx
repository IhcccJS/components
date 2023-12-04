import React from 'react';
import isEqual from 'lodash/isEqual';
import { Table } from 'antd';
import { useApi } from '@ihccc/hooks';
import { isString } from '@ihccc/utils';
import ListWrapper from '../list-wrapper';
import RowSelectionAble from '../base-list/row-selection-able';
import columnsHelper from '../columns-helper';

const AutoList = React.memo(
  function (props) {
    const {
      access,
      name,
      query,
      initialData,
      defaultParams,
      params,
      format,
      onSuccess,
      columns,
      showIndex,
      pagination,
      children,
      ...restProps
    } = props;
    const [oldParams, setOldParams] = React.useState({});
    const [page, setPage] = React.useState({ pageNumber: 1, pageSize: 10 });

    const listColumns = columnsHelper.useColumns(columns, {
      access: Object.assign(
        { handler: 'baseList' },
        isString(access) ? { name: access } : access,
      ),
      name: name || 'list',
      showIndex: showIndex === 'order' ? page : showIndex,
      isList: true,
    });

    const request = useApi(query, {
      auto: false,
      initialData,
      defaultParams,
      format,
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
        setPage((page) => ({ ...page, pageNumber: oldParams.pageNumber }));
      },
    });

    React.useEffect(() => {
      setOldParams(request.params);
    }, [request.params]);

    React.useEffect(() => {
      if (!isEqual(oldParams, { ...defaultParams, ...params })) {
        request.run(params);
      }
    }, [params]);

    return (
      React.isValidElement(children) &&
      React.cloneElement(children, {
        ...restProps,
        columns: listColumns,
        loading,
        dataSource: request.data?.list || request.data || [],
        pagination: pagination &&
          typeof request.data?.total === 'number' && {
            total: request.data.total,
            showSizeChanger: true,
            showQuickJumper: true,
            current: page.pageNumber,
            pageSize: page.pageSize,
            size: 'small',
            pageSizeOptions: ['10', '25', '50'],
            onChange: handlePageChange,
            onShowSizeChange: handlePageChange,
            showTotal: (total) => `总计 ${total} 条数据`,
            ...pagination,
          },
      })
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps),
);

export function AutoTable(props) {
  return (
    <AutoList {...props}>
      <Table scroll={{ x: 'max-content' }} rowKey="id" />
    </AutoList>
  );
}

export function AutoRender({ children, ...props }) {
  return (
    <AutoList {...props}>
      <ListWrapper alias="dataSource">
        <RowSelectionAble>{children}</RowSelectionAble>
      </ListWrapper>
    </AutoList>
  );
}

AutoList.defaultProps = {
  // showIndex
  initialData: { list: [], total: 0 },
  defaultParams: { pageNumber: 1, pageSize: 10 },
};

AutoList.Table = AutoTable;
AutoList.Render = AutoRender;

export default AutoList;
