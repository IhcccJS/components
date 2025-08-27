import React from 'react';
import get from 'lodash/get';
import { List } from 'antd';
import { isFunction } from '@ihccc/utils';
import CardItem from './card-item';
import ListItem from './list-item';
import definePlugin from '../../create-component/definePlugin';

const defaultRenderComponent = {
  card: CardItem,
  list: ListItem,
};

function collection(columns) {
  const renderColumns = [];
  if (!columns) return renderColumns;

  for (let index = 0; index < columns.length; index++) {
    const col = columns[index];
    if (!col.listRender?.as) continue;
    const dataIndex = Array.isArray(col.dataIndex) ? col.dataIndex.join('') : col.dataIndex;
    // TODO: 将这个步骤迁移到 useColumns 内进行
    renderColumns.push({
      title: col.listRender.hideTitle ? '' : col.title,
      key: dataIndex || col.key,
      render: col.render,
      as: col.listRender.as,
      className: col.listRender.className,
      style: col.listRender.style,
      index: col.listRender.index,
    });
  }

  return function (item, index) {
    const initialElement = {
      getItem(name) {
        return initialElement[name] || [];
      },
      getItemFirst(name, defaultValue) {
        return get(initialElement, [name, 0], defaultValue || {});
      },
    };
    return renderColumns.reduce((element, col) => {
      const val = get(item, col.key);
      const renderContent = {
        ...col,
        content: !col.render ? val : col.render(val, item, index),
      };
      if (!element[col.as]) element[col.as] = [];
      element[col.as].push(renderContent);
      return element;
    }, initialElement);
  };
}

export default definePlugin({
  name: 'listNormal',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    const { list: listProps = {}, renderList = {}, rowKey = 'key' } = props;

    const { request } = instance.getPlugin('request');
    const columnsTransform = instance.getPlugin('columnsTransform');
    const itemSelections = instance.getPlugin('itemSelections');

    const renderType = renderList.type || 'card';

    // #FIXME: TypeError: Cannot read properties of null (reading 'columnsRender')
    const { columnsRender, RenderComponent } = React.useMemo(() => {
      return {
        columnsRender: collection(columnsTransform.tableColumns.data),
        RenderComponent: { ...defaultRenderComponent, ...renderList.renderComponent }[renderType],
      };
    }, [columnsTransform.tableColumns.data, renderType]);

    const renderItemContent = React.useMemo(() => {
      // 获取不到 selection
      if (!!listProps.renderItem) return listProps.renderItem;

      const itemProps = renderList.itemProps;

      return (item, index) => {
        if (!RenderComponent) return null;

        const { children, ...restProps } = isFunction(itemProps)
          ? itemProps({ data: item, index, selection: itemSelections?.selection })
          : itemProps || {};

        return React.createElement(
          RenderComponent,
          {
            ...restProps,
            data: item,
            index,
            columnsRender,
          },
          children,
        );
      };
    }, [renderType, columnsRender, itemSelections?.selection?.selected]);

    const content = (
      <List
        {...listProps}
        pagination={false}
        loading={request.loading}
        dataSource={request.data.list}
        renderItem={renderItemContent}
        // FIXME overflow 应不应该设置
        style={{ /** overflow: 'auto', */ marginBottom: -16, ...listProps.style }}
        rowKey={rowKey || listProps.rowKey}
      />
    );

    return { children: content };
  },
});
