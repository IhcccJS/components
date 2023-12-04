import { createStyles, css } from 'antd-style';

export default createStyles(
  {
    'bc-file-select': css`
      cursor: pointer;
    `,
    'bc-file-select-disabled': css`
      cursor: not-allowed;
    `,
  },
  { hashPriority: 'low' },
);
