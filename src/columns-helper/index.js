import load from './load';
import transform from './transform';
import { columnSetter } from '@/components/@setter';
import useColumns from './useColumns';

const columnsHelper = {
  load,
  transform,
  fields: columnSetter,
  useColumns,
};

export default columnsHelper;
