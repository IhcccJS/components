import { createStyles, css } from 'antd-style';

export default createStyles(
  () => {
    return css`
      &.oauthLink {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 32px 0;
        padding: 32px 0;
        border-radius: 32px;
        background: rgba(245, 245, 245, 0.8);
      }

      &.clientBlock {
        width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: #393939;
        font-weight: bold;
        font-size: 16px;
      }

      &.image {
        padding: 2px;
        margin-bottom: 12px;
        border-radius: 32px;
        background-color: #fff;
        border: 1px solid #c9c9c9;
      }

      &.arrow {
        font-size: 36px;
        color: var(--primary);
      }

      &.desc {
        margin-bottom: 32px;
        font-size: 16px;
      }
    `;
  },
  { hashPriority: 'low' },
);
