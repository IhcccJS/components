import React from 'react';
import { isString } from '@ihccc/utils';
import Item from './item';
import { CssGrid, Column } from '../css-grid';
import columnsHelper from '../columns-helper';

const Detail = (props) => {
  const {
    access,
    name,
    columns,
    data,
    colProps,
    filter,
    children,
    ...restProps
  } = props;

  const isValidElement = React.useMemo(
    () => React.isValidElement(children),
    [children],
  );

  if (!isValidElement) return null;

  const profileColumns = columnsHelper.useColumns(columns, {
    access: Object.assign(
      { handler: 'baseList' },
      isString(access) ? { name: access } : access,
    ),
    name: name || 'profile',
    handler: 'baseList',
    isProfile: true,
  });

  // const profileColumns = React.useMemo(
  //   () => columnsHelper.transform(columns, { name, isProfile: true }),
  //   [],
  // );

  return (
    <React.Fragment>
      <CssGrid {...restProps}>
        {profileColumns.map((item) => {
          const visible = filter && filter(item, data[item.dataIndex], data);
          if (visible === false) return null;
          return (
            <Column
              {...colProps}
              {...item.colProps}
              key={item.key || item.dataIndex}
            >
              {React.cloneElement(children, {
                ...item.profileProps,
                label: item.title,
                value: data[item.dataIndex],
                record: data,
                render: item.profileRender || item.render,
              })}
            </Column>
          );
        })}
      </CssGrid>
    </React.Fragment>
  );
};

Detail.defaultProps = {
  data: {},
  columns: [],
  children: <Item />,
};

Detail.Item = Item;

export default Detail;
