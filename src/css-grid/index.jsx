import React from 'react';
import { isNumber, isObject } from '@ihccc/utils';
import Column from '../column';
import useBreakpoint from './useBreakpoint';
import { getGrid } from './utils';
import useStyles from './style';

/**
 * CssGrid 栅格
 * @param {number} props.column 单行的列数 在没有grid配置的情况下有效 默认值：2
 * @param {object} props.grid 单行的列数（响应式）['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
 * @param {number|string} props.gap 行列间距 默认值：20
 * @param {number|object} props.maxCount 最大显示单元数量（支持响应式）['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
 * 如果小于等于 0 就显示全部
 *
 * @example
 *
 *  // column
 *  <CssGrid column={12}>...</CssGrid>
 *
 *  // grid
 *  <CssGrid grid={{ xxl: 8, xl: 6, lg: 4, md: 3, sm: 2, xs: 1 }}>...</CssGrid>
 *
 *  // gap
 *  <CssGrid column={12} gap={10}>...</CssGrid>
 *  <CssGrid gap='16px 32px'>...</CssGrid>
 *
 *  // max
 *  <CssGrid column={12} max={10}>...</CssGrid>
 *  <CssGrid
 *    grid={{ xxl: 8, xl: 6, lg: 4, md: 3, sm: 2, xs: 1 }}
 *    max={{ xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
 *  >
 *    ...
 *  </CssGrid>
 *
 */
export const CssGrid = function (props) {
  const {
    className,
    column = 1,
    grid = {},
    max = 0,
    gap = 24,
    style,
    children,
    ...rest
  } = props;
  const { styles, cx } = useStyles();
  const media = useBreakpoint();

  const _column = React.useMemo(() => {
    for (let screen of media) {
      if (grid.hasOwnProperty(screen)) return grid[screen];
    }
    return column;
  }, [grid, media]);

  const _max = React.useMemo(() => {
    if (isNumber(max)) return max;
    if (isObject(max)) {
      for (let screen of media) {
        if (max.hasOwnProperty(screen)) return max[screen];
      }
    }
    return 0;
  }, [max, media]);

  const _children = React.useMemo(
    () => React.Children.toArray(children).filter((i) => !!i),
    [children],
  );

  const blocks = React.useMemo(
    () => getGrid(_children, media, _column, _max),
    [_children, media, _column, _max],
  );

  return (
    <div
      className={cx(styles, 'bc-grid', className)}
      style={{
        ...style,
        gridTemplateColumns: `repeat(${_column}, 1fr)`,
        gap,
      }}
      {...rest}
    >
      {React.Children.map(_children, (child, index) => {
        let [gridArea, count] = blocks[index];
        if (!child.props.important && _max > 0 && count >= _max) return void 0;
        return (
          React.isValidElement(child) && React.cloneElement(child, { gridArea })
        );
      })}
    </div>
  );
};

CssGrid.Column = Column;
CssGrid.useBreakpoint = useBreakpoint;

export { Column, useBreakpoint };

export default CssGrid;
