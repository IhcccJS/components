import createComponent from '../create-component';

import ColumnsTransform from './plugins/columns-transform';
import ColumnActionEdit from './plugins/plugin-column-action-edit';
import TableList from './plugins/table-list';
import EditList from './plugins/edit-list';
import Layout from './plugins/layout';

const EditTableRow = createComponent([Layout, EditList, ColumnActionEdit, ColumnsTransform, TableList]);

export default EditTableRow;
