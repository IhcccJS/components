import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return {
      'bc-preview-status': css`
        color: #a9a9a9;
        font-size: 14px;
        line-height: 14px;
        transition: 0.2s ease-in-out;
      `,
      'bc-preview-status-text': css`
        margin-left: 8px;
      `,
      float: css`
        position: absolute;
        top: 0;
        right: 0;
        background-color: #b9b9b9;
        padding: 4px 4px 7px 7px;
        border-radius: 0 0 0 30px;
        box-shadow: -2px 2px 8px 2px rgba(0, 0, 0, 0.2);
        z-index: 9;
        color: #fff;
      `,
      'float.done': css`
        background-color: var(--green);
      `,
    };
  },
  { hashPriority: 'low' },
);
