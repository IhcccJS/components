import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    const commonPreview = css`
      position: relative;
      text-align: center;
      vertical-align: top;
      background-color: #f5f5f5;
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
      border-radius: ${token.borderRadius}px;
      transition: 0.3s;
      overflow: hidden;

      &:not(.disabled):hover {
        background-color: #f1f1f1;
      }
    `;

    return {
      /** normal size */
      'bc-preview-normal': css`
        ${commonPreview}
        width: 104px;
        height: 104px;
        padding: 6px;

        .remove-button {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 20px;
          background-color: #f44336;
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 20px;
          transition: 0.15s ease-in-out;
          transform: translateY(20px);
          cursor: pointer;
          z-index: 2;
        }

        &:hover .remove-button {
          transform: translateY(0);
        }

        .uploading {
          background-color: ${token.colorPrimary};
        }

        .done {
          background-color: ${token.colorSuccess};
        }

        .error {
          background-color: ${token.colorError};
        }
      `,
      'bc-preview-normal-progress': css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.95);
        z-index: 1;
      `,
      'bc-preview-normal-content': css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        p {
          margin-top: 4px;
          margin-bottom: 0;
          text-align: center;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `,

      /** plus size */
      'bc-preview-plus': css`
        ${commonPreview}
        // width: 100%;
        height: auto;
        padding: 16px;

        &.uploading {
          color: ${token.colorPrimary};
        }
        &.done {
          color: ${token.colorSuccess};
        }
        &.error {
          color: ${token.colorError};
        }
      `,
      'bc-preview-plus-content': css`
        display: flex;
      `,
      'bc-preview-plus-preview': css`
        width: 128px;
        height: 128px;
        min-width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        padding: 4px;
        background-color: #ffffff;
        border-radius: 4px;
      `,
      'bc-preview-plus-info': css`
        margin: 0 20px;
        text-align: left;
        flex: 1;

        & > p {
          word-break: break-all;
          margin: 4px 0;
        }
      `,

      '@media (max-width: 578px) .bc-preview-normal .remove-button': css`
        transform: translateY(0);
      `,
    };
  },
  { hashPriority: 'low' },
);
