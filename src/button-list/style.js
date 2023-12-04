import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token, prefixCls }) => {
    return css`
      &.bc {
        &-action-buttons {
          display: flex;
          align-items: center;

          &-inline {
            display: inline-flex;
          }

          &-wrap {
            flex-wrap: wrap;
          }

          &-layout {
            &-start {
              justify-content: flex-start;
            }
            &-center {
              justify-content: center;
            }
            &-end {
              justify-content: flex-end;
            }
            &-around {
              justify-content: space-around;
            }
            &-between {
              justify-content: space-between;
            }
            &-evenly {
              justify-content: space-evenly;
            }
          }

          &-reverse {
            flex-direction: row-reverse;
          }

          &-group {
            .${prefixCls}-btn:hover {
              z-index: 3;
            }

            .${prefixCls}-btn,
              .${prefixCls}-btn.${prefixCls}-btn-circle,
              .${prefixCls}-btn.${prefixCls}-btn-round {
              border-radius: 0;
            }

            .${prefixCls}-btn + .${prefixCls}-btn {
              margin-left: -1px;
            }

            .${prefixCls}-btn:nth-of-type(1) {
              border-top-left-radius: ${token.borderRadius}px;
              border-bottom-left-radius: ${token.borderRadius}px;
            }

            .${prefixCls}-btn:nth-last-of-type(1) {
              border-top-right-radius: ${token.borderRadius}px;
              border-bottom-right-radius: ${token.borderRadius}px;
            }

            .${prefixCls}-btn.${prefixCls}-btn-round:nth-of-type(1) {
              border-top-left-radius: 24px;
              border-bottom-left-radius: 24px;
            }

            .${prefixCls}-btn.${prefixCls}-btn-round:nth-last-of-type(1) {
              border-top-right-radius: 24px;
              border-bottom-right-radius: 24px;
            }
          }

          &-space {
            &-empty {
              display: inline-block;
              width: ${token.size}px;
            }

            &-divider {
              position: relative;
              display: inline-block;
              height: 1em;
              margin: 0 ${token.size / 2}px;
              vertical-align: middle;
              border-left: 1px solid rgba(5, 5, 5, 0.06);
            }

            &-full {
              display: inline-block;
              flex: 1;
            }
          }
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
