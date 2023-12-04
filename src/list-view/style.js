import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc-list-view {
        position: relative;
        margin: -8px;
      }

      &.bc-list-view-item {
        display: inline-flex;
        flex-flow: column;
        box-sizing: border-box;
        padding: 8px;
      }
    `;
  },
  { hashPriority: 'low' },
);
