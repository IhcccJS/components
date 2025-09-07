import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.prefixIcon {
        color: var(--color-primary, #3b82f6);
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
