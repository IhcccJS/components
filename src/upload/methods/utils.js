import { isString, isObject } from '@ihccc/utils';

export const defaultIsUploadedFile = (file) => {
  return isString(file) || (isObject(file) && file.hasOwnProperty('id'));
};

export const defaultIsFile = (file) => {
  return file instanceof Blob ? file : false;
};
