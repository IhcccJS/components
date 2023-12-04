import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc-grid-item {
        position: relative;
        min-width: 0;
      }
    `;
  },
  { hashPriority: 'low' },
);
