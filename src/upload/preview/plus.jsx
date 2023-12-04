import React from 'react';
import { Button, Progress } from 'antd';
import UploadStatus from './upload-status';
import useStyles from '../style/preview';

function Plus(props) {
  const {
    className,
    disabled,
    file,
    progressProps,
    onRemove,
    children,
    ...restProps
  } = props;
  const { styles, cx } = useStyles();

  return (
    <div
      className={cx(styles['bc-preview-plus'], className, {
        [styles['disabled']]: disabled,
      })}
      {...restProps}
    >
      {!!file ? (
        <React.Fragment>
          <div className={styles['bc-preview-plus-content']}>
            <div className={styles['bc-preview-plus-preview']}>{children}</div>
            <div className={styles['bc-preview-plus-info']}>
              <p>文件：{file.name || '未知'}</p>
              <p>类型：{file.extname || '未知'}</p>
              <p>大小：{file.size || '未知'}</p>
              {file.status === 'uploading' ? (
                <Progress
                  status="active"
                  trailColor="#e5e5e5"
                  {...progressProps}
                  percent={file.percent}
                />
              ) : (
                <UploadStatus text status={file.status} />
              )}
            </div>
            {!disabled && file.status !== 'uploading' && (
              <Button
                type="link"
                size="small"
                danger
                title="删除"
                onClick={onRemove}
              >
                删除
              </Button>
            )}
          </div>
        </React.Fragment>
      ) : (
        children
      )}
    </div>
  );
}

export default Plus;
