import { uuid, getBase64, isString, isFunction, fileSizeFormatter } from '@wowon/utils';

const getExtname = (fileName) => {
  if (fileName.indexOf('.') > -1) {
    const type = fileName.split('.').pop().toLowerCase();
    return type === 'jpeg' ? 'jpg' : type;
  }
  return '';
};

const nameFromPath = (fileName) => fileName.split(/\/|\\/g).pop();

const toFixed = (number, n) => {
  if (isFunction(number.toFixed)) return number.toFixed(n);
  return Math.floor(number * 10 ** n) / 10 ** n;
};

class UploadFile {
  static imageType = ['png', 'jpg', 'gif', 'bmp', 'webp'];
  static formatPercent(percent) {
    return toFixed(percent, 1);
  }
  static is(file) {
    return file instanceof UploadFile;
  }
  constructor(source, did) {
    this.uid = uuid('upload');
    this.name = source.name || nameFromPath(source.src || '') || '';
    this.type = source.type || 'unKnow';
    this.extname = source.extname;
    this.size = isString(source.size) ? source.size : fileSizeFormatter(source.size);
    this.percent = 0;
    this.src = source.src || '';
    this.status = 'not-upload';
    if (did) this.did = did;
    this.init(source);
  }
  init(source) {
    this.source = source || null;
    this.isBlob = source instanceof Blob;
    if (!this.extname) this.extname = getExtname(this.name);
    this.isImage = source.isImage || UploadFile.imageType.includes(this.extname);
    if (this.isBlob) {
      this.size = fileSizeFormatter(source.size);
    } else {
      this.status = 'done';
    }
    return this;
  }
  setSrc(src) {
    if (src) this.src = src;
    return this;
  }
  getSrc(callback) {
    if (this.src) {
      isFunction(callback) && callback(this.src);
    } else if (this.isImage) {
      getBase64(this.source).then((src) => {
        this.src = src;
        isFunction(callback) && callback(src);
      });
    }
    return this;
  }
  update(percent) {
    if (percent >= 0) this.percent = UploadFile.formatPercent(percent);
    if (percent === 100) this.status = 'done';
    else if (percent > 0) this.status = 'uploading';
    else if (percent === 0) this.status = 'not-upload';
    else if (percent === -1) this.status = 'error';
    return this;
  }
}

export default UploadFile;
