import { isArray } from '@ihccc/utils';

export function toArray(number, config = {}) {
  if (isArray(number)) return number.concat(config);
  return [number, 1, config];
}

export function getBlock(props = {}, media) {
  const { grid = {}, span = 1, full = false, important = false } = props;
  const other = { full, important };
  for (let screen of media) {
    if (grid.hasOwnProperty(screen)) return toArray(grid[screen], other);
  }
  return toArray(span, other);
}

export function getLastBigSpanIndex(blocks) {
  for (let i = blocks.length - 1; i >= 0; i--) {
    let [colSpan, rowSpan, config] = blocks[i];
    if (colSpan > 1 || rowSpan > 1 || config.full || config.important) return i;
  }
  return -1;
}

export function getGrid(children = [], media, maxColumn, max) {
  let colStart = 1,
    rowStart = 1,
    colEnd = 2,
    rowEnd = 2,
    count = 0,
    map = {};

  const blocks = children.map((child) =>
    getBlock(Object.assign({}, child.props), media),
  );

  const last = getLastBigSpanIndex(blocks);

  return blocks.map((span, index) => {
    const [colSpan = 1, rowSpan = 1, config] = span;
    let current = count;
    if ((!config.important && max > 0 && count >= max) || index > last) {
      return ['', current];
    }
    // 如果 列结束值 大于最大列 或者 第一个元素
    colStart = colEnd > maxColumn || index === 0 ? 1 : colEnd;
    // 如果超出了最大列数
    if (colStart + colSpan > maxColumn + 1) colStart = 1;
    // 计算 行开始
    rowStart = Math.ceil((count + 1) / maxColumn);
    // 如果标记的当前区域有单元，判断下一个区域
    while (map[`${rowStart}-${colStart}`]) {
      colStart += 1;
      if (colStart + colSpan > maxColumn + 1) {
        colStart = 1;
        rowStart += 1;
      }
    }
    // 计算列结束
    colEnd = Math.min(maxColumn + 1, colSpan + colStart);
    if (config.full) colEnd = maxColumn + 1;
    // 计算行结束
    rowEnd = rowStart + rowSpan;
    // 计数
    count += colEnd - colStart;
    // 标记占用区域
    for (let i = 0; i < rowSpan; i++) {
      for (let j = 0; j < colSpan; j++) {
        map[`${rowStart + i}-${colStart + j}`] = true;
      }
    }
    return [`${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`, current];
  });
}
