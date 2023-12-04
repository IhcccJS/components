import React from 'react';
import { Checkbox, Divider } from 'antd';
import { useControllableValue } from 'ahooks';
import { ReactSortable } from 'react-sortablejs';
import ColumnItem from './column-item';
import { checkedFilter, fixColumnItem, fixColumns } from './utils';
import useStyles from './style';

function ColumnsEditor(props) {
  const { column, canAlign, canFixed, canSort } = props;
  const [value, setValue] = useControllableValue(props, {
    defaultValue: [],
  });
  const { styles, cx } = useStyles();

  const checkedList = React.useMemo(() => {
    return (value || [])
      .filter(checkedFilter)
      .map((item) => item.key || item.dataIndex);
  }, [value]);

  const canFixedItem = React.useCallback(
    (index) => {
      const prev = value[index - 1];
      const next = value[index + 1];
      const fixLeft = prev?.fixed === 'left' || prev?.fixed === true || !prev;
      const fixRight = next?.fixed === 'right' || !next;

      let fixed = null;
      if (fixLeft) fixed = 'fixedLeft';
      if (fixRight) fixed = 'fixedRight';
      if (fixLeft && fixRight) fixed = 'fixed';
      return fixed;
    },
    [value],
  );

  const handleCheckAllChange = React.useCallback((e) => {
    const checked = e.target.checked;
    setValue((value) => {
      return (value || []).map((item) => ({ ...item, _checked: checked }));
    });
  }, []);

  const handleCheckedChange = React.useCallback((list) => {
    setValue((value) => {
      return (value || []).map((item) => {
        return {
          ...item,
          _checked: (list || []).includes(item.key || item.dataIndex),
        };
      });
    });
  }, []);

  const handleSort = React.useCallback((list) => {
    if (list.length === 0) return;
    setValue(fixColumns(list));
  }, []);

  const handleItemChange = React.useCallback((value, index) => {
    setValue((data) => {
      const nextData = [...data];
      nextData[index] = { ...nextData[index], ...value };
      return fixColumnItem(nextData, index);
    });
  }, []);

  const columnItems = value.map((item, index) => (
    <ColumnItem
      classNames={{
        columnItem: cx(styles, 'bc-column-item'),
        header: cx(styles, 'bc-column-item-header'),
        handle: cx(styles, 'bc-column-item-handle'),
        title: cx(styles, 'bc-column-item-title'),
        body: cx(styles, 'bc-column-item-body'),
        cell: cx(styles, 'bc-column-item-cell'),
      }}
      title={item.title}
      alignAble={canAlign}
      fixedAble={!canFixed ? false : canFixedItem(index)}
      sortAble={canSort}
      value={{
        checked: item.key || item.dataIndex,
        align: item.align || 'left',
        fixed: item.fixed || '',
      }}
      onChange={(value) => handleItemChange(value, index)}
      key={item.key || item.dataIndex}
    />
  ));

  return (
    <div className={cx(styles, 'bc-column-list')}>
      <Checkbox
        indeterminate={
          checkedList.length > 0 && checkedList.length < value.length
        }
        checked={checkedList.length === value.length}
        onChange={handleCheckAllChange}
      >
        全选
      </Checkbox>
      <Divider />
      <Checkbox.Group
        style={{ width: '100%' }}
        value={checkedList}
        onChange={handleCheckedChange}
      >
        {!canSort ? (
          <div className={cx(styles, 'bc-column-list-main')}>{columnItems}</div>
        ) : (
          <ReactSortable
            className={cx(styles, 'bc-column-list-main')}
            handle={ColumnItem.DRAG_CLASS}
            list={value}
            setList={handleSort}
            animation={250}
            style={{ gridTemplateColumns: `repeat(${column}, 1fr)` }}
          >
            {columnItems}
          </ReactSortable>
        )}
      </Checkbox.Group>
    </div>
  );
}

ColumnsEditor.defaultProps = {
  column: 6,
  canAlign: true,
  canFixed: true,
  canSort: true,
};

export default ColumnsEditor;
