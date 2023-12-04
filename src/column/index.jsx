import React from 'react';
import useStyles from './style';

/**
 * CssGrid 栅格的列单元
 * @param {number} props.span 单位 在没有grid配置的情况下有效 默认：1
 * @param {object} props.grid 响应式配置 ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
 * @param {boolean} props.full 是否填充剩余的空间
 * @param {boolean} props.important 是否必须显示
 *
 * @example
 *
 *  // span
 *  <Column span={2}>...</Column>
 *
 *  // grid
 *  <Column grid={{ xxl: 6, xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}>...</Column>
 *
 *  // full
 *  <Column full>...</Column>
 *
 *  // important
 *  <Column important>...</Column>
 *
 */
const Column = function (props) {
  const { className, span, grid, full, important, gridArea, style, ...rest } =
    props;
  const { styles, cx } = useStyles();

  return (
    <div
      className={cx(styles, 'bc-grid-item', className)}
      {...rest}
      style={{
        ...style,
        gridArea,
      }}
    />
  );
};

export default Column;
