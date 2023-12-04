import React from 'react';
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  DragOutlined,
  MoreOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import { Checkbox } from 'antd';
import Radio from '../../select-v2/radio';

const DRAG_CLASS = 'drag-handle';

const fixedLeft = {
  label: (
    <PushpinOutlined title="固定到左侧" style={{ transform: 'scaleX(-1)' }} />
  ),
  value: 'left',
};
const fixedCancel = { label: <MoreOutlined title="取消固定" />, value: '' };
const fixedRight = {
  label: <PushpinOutlined title="固定到右侧" />,
  value: 'right',
};

const options = {
  align: [
    { label: <AlignLeftOutlined title="左对齐" />, value: 'left' },
    { label: <AlignCenterOutlined title="居中对齐" />, value: 'center' },
    { label: <AlignRightOutlined title="右对齐" />, value: 'right' },
  ],
  fixedLeft: [fixedLeft, fixedCancel],
  fixedRight: [fixedCancel, fixedRight],
  fixed: [fixedLeft, fixedCancel, fixedRight],
};

function ColumnItem({
  classNames,
  title,
  alignAble,
  fixedAble,
  sortAble,
  value,
  onChange,
}) {
  const handleChange = React.useCallback(
    (key, valName) => (e) => {
      const thisValue = e.target[valName || 'value'];
      onChange && onChange({ ...value, [key]: thisValue });
    },
    [value, onChange],
  );

  return (
    <div className={classNames.columnItem}>
      <div className={classNames.header}>
        {sortAble && (
          <DragOutlined className={`${DRAG_CLASS} ${classNames.handle}`} />
        )}
        <div className={classNames.title}>{title}</div>
        <Checkbox value={value.checked} />
      </div>
      {(alignAble || fixedAble !== false) && (
        <div className={classNames.body}>
          {alignAble && (
            <div className={classNames.cell}>
              <span>对齐</span>
              <Radio
                options={options.align}
                size="small"
                optionType="button"
                // buttonStyle="solid"
                value={value.align}
                onChange={handleChange('align')}
              />
            </div>
          )}
          {!!fixedAble && (
            <div className={classNames.cell}>
              <span>固定</span>
              <Radio
                options={options[fixedAble]}
                size="small"
                optionType="button"
                // buttonStyle="solid"
                value={value.fixed}
                onChange={handleChange('fixed')}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ColumnItem.DRAG_CLASS = '.' + DRAG_CLASS;

export default ColumnItem;
