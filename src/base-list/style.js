import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc {
        &-function-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        &-function-title {
          font-size: 18px;
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
