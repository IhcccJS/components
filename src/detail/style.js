import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc-detail-item {
        position: relative;
        display: flex;

        &-vertical {
          flex-direction: column;
          justify-content: center;

          .bc-detail-item-title {
            margin-bottom: 4px;
          }
        }

        &-horizontal {
          flex-direction: row;

          .bc-detail-item-title {
            margin-right: 4px;
            white-space: nowrap;
          }
        }

        &-title {
          color: #a9a9a9;
          font-size: 14px;
        }

        &-content {
          color: #434343;
          font-size: 14px;
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
