import load from './load';
import transform from './transform';
import { columnSetter } from './setter';
import useColumns from './useColumns';

const columnsHelper = {
  /**
   * @deprecated use `columnsHelper.load` instead.
   */
  from: load,
  load,
  transform,
  fields: columnSetter,
  useColumns,
};

export default columnsHelper;
