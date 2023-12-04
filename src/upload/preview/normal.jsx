import React from 'react';
import { Progress } from 'antd';
import UploadStatus from './upload-status';
import useStyles from '../style/preview';

const RemoveButton = (props) => (
  <div className="remove-button" title="删除" {...props}>
    删除
  </div>
);

function Normal(props) {
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
      className={cx(styles['bc-preview-normal'], className, {
        [styles['disabled']]: disabled,
      })}
      {...restProps}
    >
      {!!file ? (
        <React.Fragment>
          {file.status === 'uploading' && (
            <div className={styles['bc-preview-normal-progress']}>
              <Progress
                width={72}
                type="circle"
                strokeWidth={4}
                trailColor="#e5e5e5"
                {...progressProps}
                percent={file.percent}
              />
            </div>
          )}
          <UploadStatus float status={file.status} />
          <div className={styles['bc-preview-normal-content']}>
            {children}
            {!file.isImage && file.name && <p>{file.name}</p>}
          </div>
          {!disabled && file.status !== 'uploading' && (
            <RemoveButton onClick={onRemove} />
          )}
        </React.Fragment>
      ) : (
        <div className={styles['bc-preview-normal-content']}>{children}</div>
      )}
    </div>
  );
}

export default Normal;
