import React from 'react';
import { Checkbox, Radio, Pagination } from 'antd';

function RowSelectionAble(props) {
  const {
    dataSource,
    rowSelection,
    pagination,
    rowKey,
    children,
    ...restProps
  } = props;

  if (!React.isValidElement(children)) return null;

  const { type, selectedRowKeys, onChange } = rowSelection || {};

  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const onCheck = (key) => {
    const newSelectKeys = [...selectedRowKeys];
    const currentIndex = newSelectKeys.indexOf(key);
    if (currentIndex > -1) newSelectKeys.splice(currentIndex, 1);
    else newSelectKeys.push(key);
    onChange && onChange(newSelectKeys, dataSource);
    setIndeterminate(
      !!newSelectKeys.length && newSelectKeys.length < dataSource.length,
    );
    setCheckAll(newSelectKeys.length === dataSource.length);
  };

  const onCheckAll = (checked) => {
    onChange &&
      onChange(
        checked ? dataSource.map((item) => item[rowKey]) : [],
        checked ? dataSource : [],
      );
    setIndeterminate(false);
    setCheckAll(checked);
  };

  const allSelectionDom =
    type === 'radio' ? null : (
      <Checkbox
        indeterminate={indeterminate}
        onChange={(e) => onCheckAll(e.target.checked)}
        checked={checkAll}
      />
    );

  const rowSelectionEvents = React.useMemo(() => {
    return dataSource.map((item) => {
      if (type === 'radio') {
        return {
          key: item[rowKey],
          active: selectedRowKeys === item[rowKey],
          onSelect: () => onChange(item[rowKey], item),
        };
      }
      return {
        key: item[rowKey],
        active: selectedRowKeys.includes(item[rowKey]),
        onSelect: () => onCheck(item[rowKey]),
      };
    });
  }, [type, dataSource, selectedRowKeys, onCheck]);

  const rowSelectionDom = React.useMemo(() => {
    return rowSelectionEvents.map((item) => {
      return type === 'radio' ? (
        <Radio checked={item.active} onChange={item.onSelect} key={item.key} />
      ) : (
        <Checkbox
          checked={item.active}
          onChange={item.onSelect}
          key={item.key}
        />
      );
    });
  }, [type, rowSelectionEvents]);

  return (
    <React.Fragment>
      {React.cloneElement(
        children,
        Object.assign(
          {
            allSelectionDom,
            rowSelectionDom,
            allSelected: checkAll,
            allSelectEvent: onCheckAll,
            rowSelectionEvents,
            dataSource,
            rowKey,
          },
          restProps,
        ),
      )}
      {pagination !== false && (
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Pagination {...pagination} />
        </div>
      )}
    </React.Fragment>
  );
}

RowSelectionAble.defaultProps = {
  rowSelection: {},
  rowKey: 'id',
};

export default RowSelectionAble;
