import load from './load';
import { columnSetter } from '../setter';
import transform from './transform';
import useColumns from './useColumns';

const columnsHelper = {
  load,
  transform,
  fields: columnSetter,
  useColumns,
};

export default columnsHelper;
