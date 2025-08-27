import createComponent from '../create-component';

import ColumnsTransform from './plugins/columns-transform';
import TableTreeActionButton from './plugins/table-tree-action-button';
import TableTree from './plugins/table-tree';
import EditList from './plugins/edit-list';
import Layout from './plugins/layout';

const EditTableTree = createComponent([Layout, EditList, TableTreeActionButton, ColumnsTransform, TableTree]);

export default EditTableTree;
