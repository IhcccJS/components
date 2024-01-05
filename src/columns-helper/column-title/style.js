import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      .bc-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }

      &.bc-base-list-column-title-icon {
        margin-left: 8px;
        color: ${token.colorTextDescription};
        transform: scale(1.2);
      }
    `;
  },
  { hashPriority: 'low' },
);
