import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc-grid {
        position: relative;
        display: grid;
      }
    `;
  },
  { hashPriority: 'low' },
);
