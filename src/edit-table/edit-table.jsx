import core from '@/components/@comp/base-list/core';

import useColumnsTransform from './plugins/useColumnsTransform';
import useTableTreeActionButton from './plugins/useTableTreeActionButton';
import useTableList from './plugins/useTableList';
import useEditList from './plugins/useEditList';

const EditTable = core([useEditList, useTableTreeActionButton, useColumnsTransform, useTableList]);

export default EditTable;
