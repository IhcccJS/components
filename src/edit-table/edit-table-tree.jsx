import core from '@/components/@comp/base-list/core';

import useColumnsTransform from './plugins/useColumnsTransform';
import useTableTreeActionButton from './plugins/useTableTreeActionButton';
import useTableTree from './plugins/useTableTree';
import useEditList from './plugins/useEditList';

const EditTableTree = core([useEditList, useTableTreeActionButton, useColumnsTransform, useTableTree]);

export default EditTableTree;
