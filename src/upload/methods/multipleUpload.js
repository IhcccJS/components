import throttle from 'lodash/throttle';
import request from './request';
import UploadFile from '../upload-file';
import { eventEmitter, isString, isArray, isFunction } from '@ihccc/utils';

export const uploadEmiter = eventEmitter();

/**
 * 多文件递归上传
 * @param {*} url
 * @param {*} files
 * @param {*} opts
 */
function multipleUpload(url, files, opts) {
  if (!isString(url)) throw new Error('argument url error!');

  if (!files) return [];

  const uploadFiles = isArray(files) ? files : [files];

  const {
    method = 'POST',
    data,
    filename,
    headers,
    format,
    progressWait,
    onProgress,
  } = opts || {};

  const result = [];
  const needUploadFiles = [];

  for (let i = 0; i < uploadFiles.length; i++) {
    if (UploadFile.is(uploadFiles[i])) {
      if (uploadFiles[i].isBlob) {
        needUploadFiles.push(uploadFiles[i]);
      } else {
        result.push(uploadFiles[i]);
      }
    }
  }

  return new Promise((resolve, reject) => {
    function startUpload(index) {
      if (index < needUploadFiles.length) {
        const file = needUploadFiles[index];

        const emitOnUpload = (percent) => {
          uploadEmiter.emit('upload-' + file.did, file.update(percent));
        };

        request(url, {
          method,
          data,
          filename,
          headers,
          file: file.source,
          onProgress: throttle((e) => {
            if (isFunction(onProgress)) onProgress(e, index);
            emitOnUpload(e.percent);
          }, progressWait || 33),
        })
          .then((res) => {
            const fileData = isFunction(format) ? format(res) : res;
            if (!!fileData) result.push(file.init(fileData));
            emitOnUpload(!!fileData ? 100 : -1);
            startUpload(index + 1);
          })
          .catch(() => {
            emitOnUpload(-1);
            reject(index);
          });
      } else {
        resolve(result);
      }
    }

    startUpload(0);
  });
}

export default multipleUpload;
