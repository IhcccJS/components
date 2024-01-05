import load from './load';
import transform from './transform';
import { columnSetter } from './setter';
import useColumns, {
  useColumnsAccess,
  useColumnsTransform,
} from './useColumns';

const columnsHelper = {
  /**
   * @deprecated use `columnsHelper.load` instead.
   */
  from: load,
  load,
  transform,
  fields: columnSetter,
  useColumns,
  useColumnsAccess,
  useColumnsTransform,
};

export default columnsHelper;
