import { isString } from '@ihccc/utils';
import { columnSetter } from '../../setter';
// import getAliasName from '../getAliasName';

function register(columnInterface) {
  const columnAlias = columnInterface || {};

  // ID 列

  // // 操作列
  // columnSetter.use('actions', {
  //   title: '操作',
  //   key: 'actions',
  // });

  // 标题/名称类型列
  // columnSetter.use(getAliasName(columnAlias, 'name'), {
  //   title: '标题',
  //   width: 'lg',
  //   inputNode: 'input',
  //   render: 'text',
  // });

  // 描述/备注类型列
  // columnSetter.use(getAliasName(columnAlias, 'desc'), {
  //   title: '备注',
  //   width: 'xl',
  //   inputNode: 'textarea',
  //   render: ['tip', 16],
  // });

  // 金额数据列
  // columnSetter.use('indexNumber', {
  //   inputNode: 'number',
  //   render: ['number', { delimiter: ',' }],
  // });

  // 身份证号码数据列
  // columnSetter.use('idNumber', {
  //   inputNode: 'number',
  //   render: ['number', { delimiter: ',' }],
  // });

  // 手机号码数据列
  // columnSetter.use('phoneNumber', {
  //   inputNode: 'number',
  //   render: ['number', { delimiter: ',' }],
  // });

  for (let key in columnAlias) {
    if (!isString(columnAlias[key])) {
      columnSetter.use(key, columnAlias[key]);
    }
  }
}

export default register;
