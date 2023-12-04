import { createStyles, css } from 'antd-style';

export default createStyles(
  (_, { pkg }) => {
    return css`
      &.${pkg}-modal {
        .site-modal-body {
          padding-bottom: 16px;
        }
        .${pkg}-container {
          position: relative;
          width: 100%;
          height: 40vh;
          margin-bottom: 32px;
        }
        .${pkg}-control {
          display: flex;
          align-items: center;
          width: 80%;
          margin: 16px auto;

          .site-slider {
            flex: 1;
            margin: 0 20px;
          }
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
