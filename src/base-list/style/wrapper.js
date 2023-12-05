import { createStyles, css } from 'antd-style';

export default createStyles(
  ({ token }) => {
    return css`
      &.bc {
        &-base-list-wrapper {
          position: relative;
          border-radius: ${token.borderRadius}px;
          padding: 20px;
        }

        &-wrapper-style {
          background-color: #fff;
          box-shadow: ${token.boxShadowTertiary};
        }

        &-search-space {
          padding: 20px 20px 0;
          margin-bottom: 24px;
        }

        &-search-panel {
          padding: 0;
          perspective: 800px;
        }

        &-searh-content {
          transition: 0.3s ease-in-out;

          &.bc-buttons-visible {
            transform: rotateX(180deg);
            .bc-search-buttons {
              position: relative;
              display: block;
            }

            .bc-search-form {
              position: absolute;
              display: none;
            }
          }

          .bc-search-buttons {
            padding: 20px;
            position: absolute;
            left: 0;
            right: 0;
            transform: rotateX(180deg);
            display: none;
          }

          .bc-search-form {
            position: relative;
            padding: 20px 20px 0;
          }
        }

        &-fast-query {
          &-list {
            display: flex;
          }

          &-item {
            cursor: pointer;
            margin: 4px 8px;
            padding: 4px 8px;
            border-radius: 4px;
            background-color: #f5f5f5;
            transition: 0.2s ease;
            font-size: 14px;
            box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 20%);

            &:nth-of-type(1) {
              margin-left: 0;
            }

            &:nth-last-of-type(1) {
              margin-right: 0;
            }

            &:hover {
              color: var(--primary);
            }

            &:active {
              transform: scale(0.96);
            }
          }

          &-button {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -15px;
            margin: 0 auto;
            display: block;
            width: 32px;
            height: 16px;
            background: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
            border-radius: 0 0 20px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            // color: #d9d9d9;
          }
        }
      }
    `;
  },
  { hashPriority: 'low' },
);
