import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc-click-able {
        position: relative;

        .click-able-icon {
          position: absolute;
        }

        &.position {
          &-default {
            & > .click-able-icon {
              position: relative;
              display: inline-flex;
              margin-left: 4px;
            }
          }
          &-top {
            top: 10px;
            & > .click-able-icon {
              left: auto;
              right: auto;
            }
            &-left > .click-able-icon {
              top: 10px;
              left: 10px;
            }
            &-right > .click-able-icon {
              top: 10px;
              right: 10px;
            }
          }
          &-bottom {
            bottom: 10px;
            & > .click-able-icon {
              left: auto;
              right: auto;
            }
            &-left > .click-able-icon {
              left: 10px;
              bottom: 10px;
            }
            &-right > .click-able-icon {
              right: 10px;
              bottom: 10px;
            }
          }
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
