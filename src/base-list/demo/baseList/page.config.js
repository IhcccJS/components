import { eventEmitter } from '@ihccc/utils';
import { profile } from './_services';

export const getInitialValues = async (id) => {
  if (id) {
    const res = await profile({ id });
    return res.data;
  }
  return {};
};

export const ee = eventEmitter();
