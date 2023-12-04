import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      &.bc-select-item-default {
        position: relative;
        box-sizing: border-box;
        display: flex;
        background: #fff;
        border: 1px solid #d9d9d9;
        // padding: 4px 12px;
        border-radius: ${token.borderRadius}px;
        overflow: hidden;
        cursor: pointer;
        transition: ${token.motionBase || '0.4s'} ${token.motionEaseOut};

        &:not(.bc-select-item-disabled):hover {
          box-shadow: ${token.boxShadow};

          .bc-select-item-cover {
            transform: scale(1.05);
          }

          // &::before,
          // &::after {
          //   opacity: 0;
          // }
        }

        &.bc-select-item-active {
          border-color: ${token.colorPrimary};

          &::before {
            content: '';
            position: absolute;
            z-index: 9;
            // right: 12px;
            // bottom: 12px;
            // width: 18px;
            // height: 18px;
            // background: ${token.colorPrimary};
            // border-radius: 18px;
            right: 0;
            bottom: 0;
            border: 16px solid ${token.colorPrimary};
            border-left-color: transparent;
            border-top-color: transparent;
          }

          &::after {
            content: '';
            position: absolute;
            z-index: 9;
            box-shadow: -2px 2px 0px 0px #fff;
            transform: rotate(-45deg);
            // right: 16px;
            // bottom: 22px;
            // width: 10px;
            // height: 6px;
            right: 4px;
            bottom: 10px;
            width: 14px;
            height: 7px;
          }
        }

        &.bc-select-item-disabled {
          background: ${token.colorBgContainerDisabled};
          cursor: not-allowed;

          .bc-select-item-info {
            background: ${token.colorBgContainerDisabled};
          }

          &.bc-select-item-active {
            border-color: ${token.controlItemBgActiveDisabled};

            &::before {
              border-right-color: ${token.controlItemBgActiveDisabled};
              border-bottom-color: ${token.controlItemBgActiveDisabled};
            }
          }
        }

        &.bc-select-item-horizontal {
          flex-direction: row;

          .bc-select-item-cover {
            border-radius: ${token.borderRadius}px 0 0 ${token.borderRadius}px;
          }

          .bc-select-item-info {
            flex: 1;
          }
        }

        &.bc-select-item-vertical {
          flex-direction: column;

          .bc-select-item-cover {
            border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;
          }

          .bc-select-item-info {
            flex: 1;
          }
        }

        .bc-select-item-info {
          box-sizing: border-box;
          padding: 12px;
        }

        .bc-select-item-cover {
          // max-width: 160px;
          // max-height: 160px;
          transition: ${token.motionBase || '0.4s'} ${token.motionEaseOut};
        }

        .bc-select-item-label {
          font-size: 16px;
          font-weight: bold;
          color: ${token.colorTextLabel};
        }

        .bc-select-item-desc {
          margin-top: ${token.marginSM}px;
          color: ${token.colorTextDescription};
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
