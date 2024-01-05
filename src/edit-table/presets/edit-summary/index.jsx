import React from 'react';
import { Divider } from 'antd';
import { useUnmountedRef } from 'ahooks';
import { delay, forEachPromised } from '@ihccc/utils';
import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import {
  rowState,
  eventMap,
  EditAllTableButtons,
  actionColumn,
} from './buttons';
import useForwardRef from '../useForwardRef';
import EditTable from '../../edit-table';

const DefaultRowStatus = {
  loading: true,
  success: true,
  message: null,
};

const EditSummary = React.forwardRef(function EditSummary(props, ref) {
  const {
    dataSource,
    rowTags,
    onAction,
    onSuccess,
    actionButton,
    ...restProps
  } = props;
  const unmountedRef = useUnmountedRef();
  const etRef = useForwardRef(ref);
  const [data, setData] = React.useState(null);
  const [updatedData, setUpdatedData] = React.useState(null);
  const [activeRow, setActiveRow] = React.useState([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const submitedKey = React.useRef(false);

  const setActiveInfo = (index, info) => {
    setActiveRow((rows) => {
      const newRows = [...rows];
      newRows[index] = info;
      return newRows;
    });
  };

  const handleChange = (list) => {
    setData(list);
  };

  const onRefresh = () => {
    setUpdatedData(null);
    setData(null);
    setActiveRow([]);
    setStartIndex(0);
    setSuccess(false);
    onSuccess?.();
  };

  const doAction = (list, index) => {
    forEachPromised(
      list,
      async (record, index) => {
        await delay(1500);
        const _record = omit(record, [rowState.key]);
        const names = ['remove', 'create', 'update'];
        const actionName = rowState.getActionName(record, names);
        if (!actionName) return;
        setActiveInfo(index, { ...DefaultRowStatus });
        const { success, message } = await onAction(actionName, _record);
        setActiveInfo(index, { success, message, loading: false });
        if (!success) {
          setStartIndex(index);
          throw { index };
        }
      },
      index,
    ).then(() => {
      setSuccess(true);
    });
  };

  const onSubmit = () => {
    submitedKey.current = true;
  };

  const updated = React.useMemo(
    () => differenceWith(data, dataSource, isEqual),
    [data, dataSource],
  );

  React.useEffect(() => {
    if (!submitedKey.current || unmountedRef.current) return;
    submitedKey.current = false;
    etRef.current.edit(false);
    setUpdatedData(updated);
    doAction(updated, startIndex);
  }, [updated, startIndex]);

  return (
    <EditTable
      {...restProps}
      ref={etRef}
      dataSource={updatedData || data || dataSource}
      onChange={handleChange}
      actionColumn={actionColumn}
      eventMap={eventMap}
      eventData={{ activeRow, success, onRefresh, onSubmit }}
      renderDom={(tableDom, eventData) => (
        <React.Fragment>
          <EditAllTableButtons
            layout="end"
            data={eventData}
            eventMap={eventMap}
          />
          <Divider dashed style={{ margin: '12px 0' }} />
          {tableDom}
        </React.Fragment>
      )}
    />
  );
});

export default EditSummary;
