import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      &.bc-task-bar {
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 16px;
        z-index: 2000;

        &-placement {
          &-right {
            right: 0;

            .bc-task-item {
              border-radius: ${token.borderRadius}px 0 0 ${token.borderRadius}px;
              transform: translateX(24px);

              &:hover {
                background: ${token.colorBgLayout};
                transform: translateX(0);
                box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.1);
              }

              &-open {
                transform: translateX(0);
              }
            }
          }
          &-top {
            top: 64px;
          }
          &-bottom {
            bottom: 32px;
          }
        }
      }

      .bc-task-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 8px 40px 8px 16px;
        background: ${token.colorBgBase};
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
        font-weight: bold;
        color: ${token.colorTextBase};
        user-select: none;
        cursor: pointer;
        transition: 0.2s ease-out;

        &:active {
          background: ${token.colorBgBase};
          color: ${token.colorTextSecondary};
        }

        &-active {
          background: ${token.colorBgLayout};
        }

        &-focus {
          color: ${token.colorPrimaryText};
          background: ${token.colorPrimaryBg};

          &:hover {
            background: ${token.colorPrimaryBgHover};
          }
        }

        &-prefix {
          color: ${token.colorText};
          margin-right: 16px;
        }

        &-title {
          max-width: 10em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &-close {
          position: absolute;
          right: 8px;
          font-size: 14px;
          color: ${token.colorTextDescription};
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
