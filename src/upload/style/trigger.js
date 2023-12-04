import { createStyles, css } from 'antd-style';

export default createStyles(
  {
    'bc-upload-drag-icon': css`
      margin: 4px 0;
      font-size: 48px;
    `,
    'bc-upload-text': css`
      margin: 0 0 4px;
      color: #000000d9;
      font-size: 16px;
    `,
    'bc-upload-hint': css`
      margin: 0 0 4px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    `,
  },
  { hashPriority: 'low' },
);
