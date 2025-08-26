import React from 'react';
import { useSelections } from 'ahooks';
import { Checkbox } from 'antd';
import { definePlugin } from '@/components/@comp/create-component';

function useRowSelection(list, options) {
  const selection = useSelections(list, { defaultSelected: options.defaultSelected, itemKey: options.rowKey });

  React.useEffect(() => {
    selection.setSelected(options.selected || []);
  }, [options.selected]);

  const selectedRowKeys = React.useMemo(() => {
    return selection.selected.map((item) => item[options.rowKey]);
  }, [selection.selected]);

  const getCheckboxProps = React.useCallback(
    (item) => {
      if (!options.disabled) return;
      return { disabled: options.disabled(item) };
    },
    [options.disabled],
  );

  const toggle = React.useCallback(
    (item) => {
      if (options.type === 'radio') {
        selection.setSelected((data) => (data.length > 0 ? [] : [item].filter((item) => !options.disabled?.(item))));
      } else {
        selection.toggle(item);
      }
    },
    [options.type, options.disabled],
  );

  return {
    ...selection,
    toggle,
    selectedRowKeys,
    isDisabled: options.disabled,
    getCheckboxProps,
  };
}

export default definePlugin({
  name: 'itemSelections',
  priority: 'CONTENT',
  props: ['itemSelections'],
  before(_, { itemSelections }) {
    if (!itemSelections) return null;

    return {
      button:
        itemSelections.type === 'radio'
          ? {
              key: 'clearAll',
              props: { type: 'link', children: '取消' },
              hidden: ({ selection }) => selection.noneSelected,
              sort: 0,
            }
          : {
              key: 'toggleAll',
              render: ({ isEmpty, allSelected, partiallySelected, selected, onClick }) => {
                return (
                  <Checkbox
                    disabled={isEmpty}
                    indeterminate={partiallySelected}
                    checked={allSelected}
                    onChange={onClick}
                  >
                    {`${allSelected ? '取消' : '全选'}（${selected.length}）`}
                  </Checkbox>
                );
              },
              sort: 0,
            },
    };
  },
  main(instance, { itemSelections, rowKey = 'key' }) {
    const { request } = instance.getPlugin('request');

    if (!itemSelections) return null;

    const list = React.useMemo(() => {
      return (request.data.list || []).filter((item) => !itemSelections?.disabled?.(item));
    }, [request.data.list]);

    const selection = useRowSelection(list, {
      rowKey,
      defaultSelected: itemSelections?.defaultSelected || [],
      selected: itemSelections?.selected,
      type: itemSelections?.type,
      disabled: itemSelections?.disabled,
    });

    return {
      selection,
      selectionType: itemSelections?.type,
      data: {
        selection,
        isEmpty: list.length === 0,
        allSelected: selection.allSelected,
        partiallySelected: selection.partiallySelected,
        selected: selection.selected,
      },
      event: {
        toggleAll: selection.toggleAll,
        clearAll: selection.clearAll,
      },
      expose: { name: 'selection', source: 'selection' },
    };
  },
});
