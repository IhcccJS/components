import createComponent from '../create-component';

import ColumnsTransform from './plugins/columns-transform';
import TableTreeActionButton from './plugins/table-tree-action-button';
import TableList from './plugins/table-list';
import EditList from './plugins/edit-list';
import Layout from './plugins/layout';

const EditTable = createComponent([Layout, EditList, TableTreeActionButton, ColumnsTransform, TableList]);

export default EditTable;
