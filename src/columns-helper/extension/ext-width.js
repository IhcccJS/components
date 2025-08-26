const columnWidth = {
  min: 50,
  xs: 60,
  sm: 80,
  md: 120,
  lg: 180,
  xl: 260,
  xxl: 360,
  max: 480,
  e4: '4em',
  e8: '8em',
  e12: '12em',
  e16: '16em',
  e20: '20em',
  e24: '24em',
  e28: '28em',
  e32: '32em',
};

function run(item, options) {
  const { enable, presetWidth } = options;

  if (!enable.width) return item;

  if (!columnWidth['__merged']) {
    Object.assign(columnWidth, presetWidth, { __merged: true });
  }

  // 转换预设 width
  if (columnWidth.hasOwnProperty(item.width)) {
    item.width = columnWidth[item.width];
  }

  return item;
}

/** 使用预设宽度 */
export default { type: 'item', run };
