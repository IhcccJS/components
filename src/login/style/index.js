import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.prefixIcon {
        color: var(--primary);
      }

      &.other {
        display: flex;
        justify-content: center;
        gap: 8px;
      }
    `;
  },
  { hashPriority: 'low' },
);
