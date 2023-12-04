import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      &.bc-image-list {
        display: flex;
        flex-wrap: wrap;

        &-item {
          width: 96px;
          height: 96px;
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          margin: 0 8px 8px 0;
          padding: 4px;
          background-color: #f5f5f5;
          box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
          border-radius: ${token.borderRadius}px;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          overflow: hidden;

          &.size-small {
            width: 80px;
            height: 80px;
          }

          &.size-middle {
            width: 96px;
            height: 96px;
          }

          &.size-large {
            width: 112px;
            height: 112px;
          }

          &:hover {
            border-color: var(--primary);
          }

          &-container {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
