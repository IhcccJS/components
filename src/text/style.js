import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc-text {
        &-number {
          display: inline-block;
          font-family: math, cursive, ui-monospace;
          font-weight: bold;
        }

        &-roll {
          position: relative;
          display: inline-flex;
          overflow: hidden;

          &::before {
            content: attr(data-label);
            white-space: nowrap;
          }

          &-enable {
            &::before,
            &::after {
              content: attr(data-label);
              white-space: nowrap;
              padding-right: 2em;
              animation: text-roll var(--roll-time) linear infinite;
            }
          }
        }

        &-copy-icon {
          margin-left: 4px;
          color: var(--primary);

          &.success {
            color: #24b588;
          }

          &.error {
            color: #f44336;
          }
        }
      }

      @keyframes text-roll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
