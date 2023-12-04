import { createStyles, css } from 'antd-style';

export default createStyles(
  {
    'bc-upload': css`
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin: -12px -12px 0 0;

      & > * {
        margin: 12px 12px 0 0;
      }
    `,
  },
  { hashPriority: 'low' },
);
