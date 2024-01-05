import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      &.bc-tag-more {
        margin-left: 8px;
        font-weight: bold;
        color: ${token.colorPrimary};
        cursor: pointer;
      }
    `;
  },
  { hashPriority: 'low' },
);
