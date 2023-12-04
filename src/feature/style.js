import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.bc-feature {
        position: relative;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        margin-right: 8px;
        padding: 2px 8px;
        overflow: hidden;
        transition: 0.1s;

        &.status {
          &-default {
            color: #78909c;
          }
          &-success {
            color: #24b588;
          }
          &-warning {
            color: #ff9800;
          }
          &-error {
            color: #f44336;
          }
          &-info {
            color: #03a9f4;
          }
          &-other {
            color: #ab47bc;
          }
        }

        &.mode {
          &-badge {
            padding: 4px 8px 4px 24px;
            &::before,
            &::after {
              content: '';
              position: absolute;
              left: 8px;
              width: 8px;
              height: 8px;
              border-radius: 8px;
              box-sizing: border-box;
            }
            &::before {
              border: 1px solid currentColor;
            }
            &::after {
              background-color: currentColor;
            }
            &.animation {
              &::before {
                animation: scale-badge 0.6s linear infinite;
              }
              &::after {
                animation: scale-badge 0.6s linear 0.3s infinite;
              }
            }
          }
          &-tag {
            border-radius: 2px;
            background-color: currentColor;
            border: 1px solid currentColor;

            .text,
            svg {
              color: #fff;
            }
          }
          &-block {
            border-radius: 2px;
            border: 1px solid currentColor;
          }
        }

        // &.mode {
        //   &-text.animation > .text {
        //     background-image: linear-gradient(
        //       60deg,
        //       rgba(0, 0, 0, 0.2),
        //       currentColor
        //     );
        //     -webkit-text-fill-color: transparent;
        //     background-clip: text;
        //     background-size: 200% 100%;
        //     animation: text-color 2s linear infinite;
        //   }
        // }

        &.mode {
          &-tag.animation,
          &-block.animation {
            &::before,
            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              transform: translateX(-100%);
              animation: flash 3s ease-in infinite;
            }
          }
          &-tag.animation {
            &::before {
              background: linear-gradient(
                -60deg,
                transparent 80%,
                rgba(255, 255, 255, 0.2) 80%,
                rgba(255, 255, 255, 0.2) 90%,
                transparent 90%
              );
            }

            &::after {
              background: linear-gradient(
                -60deg,
                transparent 55%,
                rgba(255, 255, 255, 0.3) 55%,
                rgba(255, 255, 255, 0.3) 75%,
                transparent 75%,
                transparent 80%,
                rgba(255, 255, 255, 0.2) 80%,
                rgba(255, 255, 255, 0.2) 90%,
                transparent 90%
              );
              animation-delay: 0.6s;
            }
          }
          &-block.animation {
            &::before {
              background: linear-gradient(
                -60deg,
                transparent 80%,
                currentColor 80%,
                currentColor 90%,
                transparent 90%
              );
              opacity: 0.2;
            }

            &::after {
              background: linear-gradient(
                -60deg,
                transparent 55%,
                currentColor 55%,
                currentColor 75%,
                transparent 75%,
                transparent 80%,
                currentColor 80%,
                currentColor 90%,
                transparent 90%
              );
              opacity: 0.3;
              animation-delay: 0.6s;
            }
          }
        }

        &.mode-tag,
        &.mode-block {
          &.round {
            border-radius: 16px;
          }

          &.size {
            &-small {
              padding: 3px 6px;

              .text {
                font-size: 12px;
                line-height: 12px;
              }
            }
            &-middle {
              padding: 4px 8px;

              .text {
                font-size: 14px;
                line-height: 14px;
              }
            }
            &-large {
              padding: 5px 10px;

              .text {
                font-size: 16px;
                line-height: 16px;
              }
            }
          }
        }

        &.hoverAble:not(.disabled):hover {
          opacity: 0.75;
        }

        &.disabled {
          color: #b5b5b5;
          opacity: 0.8;
        }

        &.clickAble {
          &:not(.disabled):active {
            transform: scale(0.96);
          }
        }

        .text {
          line-height: 16px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          z-index: 1;

          &.space {
            margin-left: 4px;
          }
        }
      }

      @keyframes text-color {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }

      @keyframes scale-badge {
        from {
          transform: scale(1);
          opacity: 1;
        }
        to {
          transform: scale(3);
          opacity: 0;
        }
      }

      @keyframes flash {
        0% {
          transform: translateX(-100%);
        }
        30% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
