import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      &.ant-modal-wrap.bc-cancel-mask-modal-wrap {
        pointer-events: none;
      }

      &.bc-modal-drag-handler {
        width: 100%;
        cursor: move;
      }

      &.bc-modal-mini.ant-btn.ant-btn-icon-only {
        position: absolute;
        top: 17px;
        inset-inline-end: 48px;
        padding: 0;
        width: 22px;
        height: 22px;
        color: ${token.colorTextDescription};

        &:hover {
          color: ${token.colorText};
        }
      }

      &.bc-modal-mask.ant-modal-mask {
        background-color: rgba(0, 0, 0, 0.15);
      }
    `;
  },
  { hashPriority: 'low' },
);
