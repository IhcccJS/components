import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.modalFooter {
        display: flex;
        justify-content: space-between;
      }
    `;
  },
  { hashPriority: 'low' },
);
