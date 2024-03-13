import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc {
        &-default-layout {
          position: relative;
          background: #fff;
          border-radius: 4px;

          &-head,
          &-top {
            border-bottom: 1px solid #e9e9e9;
          }

          &-head,
          &-top,
          &-body {
            padding: 12px 16px;
          }

          // &-head + &-top,
          // &-top + &-body {
          //   padding-top: 0;
          // }
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
