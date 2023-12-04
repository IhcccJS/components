export { default as cloneSomeChildren } from './cloneSomeChildren';

export { default as globalSetter } from './globalSetter';

/**
 * 转换文件尺寸
 * @param {*} byte
 * @returns
 */
export function fileSizeFormatter(byte) {
  const bytes = Number(byte) || 0;
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
