import { isArray, isObject, isFunction } from '@ihccc/utils';
import { defaultIsUploadedFile, defaultIsFile } from './utils';

/**
 * 多字段多文件递归上传
 * @param {object} files 需要上传的文件，按files键值进行分组，且分组都是数组 { fileGroup: [file, file...] }
 * @param {promise} opts.upload 自定义的上传方法
 * @returns {promise}
 */
// ## 增加报错方法，增加监听进度方法
function start(files = {}, opts = {}) {
  const {
    upload,
    isUploadedFile = defaultIsUploadedFile,
    isFile = defaultIsFile,
  } = opts;

  return new Promise((resolve, reject) => {
    if (!isFunction(upload)) {
      reject('配置参数：upload 不是正确的方法!');
      return;
    }

    const result = [];
    const valueNames = Object.keys(files);

    const uploadFile = async (nameIndex = 0, fileIndex = 0) => {
      if (nameIndex < valueNames.length) {
        const listName = valueNames[nameIndex];
        const fileList = files[listName];

        if (!isArray(fileList) || fileIndex >= fileList.length) {
          uploadFile(nameIndex + 1);
          return;
        }

        const file = isFile(fileList[fileIndex]);
        const isUploaded = isUploadedFile(fileList[fileIndex]);

        // 不是文件 或者 是已经上传过的文件
        if (!file || isUploaded) {
          if (isUploaded) result.push({ type: listName, source: file });
          uploadFile(nameIndex, fileIndex + 1);
          return;
        }

        try {
          const response = await upload({ file });

          if (isObject(response)) {
            result.push({ type: listName, ...response });
            uploadFile(nameIndex, fileIndex + 1);
          } else {
            reject(listName, fileIndex);
          }
        } catch (e) {
          reject(listName, fileIndex);
        }
      } else {
        resolve(result);
      }
    };

    uploadFile();
  });
}

export default start;
