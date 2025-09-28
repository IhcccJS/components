import createComponent from '../create-component';

import ColumnsTransform from './plugins/columns-transform';
import ColumnActionRemove from './plugins/plugin-column-action-remove';
import TableList from './plugins/table-list';
import EditList from './plugins/edit-list';
import Layout from './plugins/layout';

const EditTableAll = createComponent([Layout, EditList, ColumnActionRemove, ColumnsTransform, TableList]);

export default EditTableAll;
