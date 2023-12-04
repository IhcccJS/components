import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      &.bc {
        &-column-list {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 20px;

          &-main {
            width: 100%;
            max-height: 520px;
            overflow: auto;
            display: grid;
            gap: 20px;
          }
        }

        &-column-item {
          position: relative;
          background-color: ${token.colorBgLayout};
          border-radius: ${token.borderRadius}px;
          box-sizing: content-box;

          &-header {
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          &-handle {
            margin-right: 4px;
            font-size: 16px;
            cursor: grab;

            &:active {
              cursor: grabbing;
            }
          }

          &-title {
            flex: 1;
            font-weight: bold;
          }

          &-body {
            padding: 0 12px;
          }

          &-cell {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
