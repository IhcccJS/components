import createComponent from '../create-component';

import ColumnsTransform from './plugins/columns-transform';
import TableList from './plugins/table-list';
import EditList from './plugins/edit-list';
import Layout from './plugins/layout';

const EditTable = createComponent([Layout, EditList, ColumnsTransform, TableList]);

export default EditTable;
