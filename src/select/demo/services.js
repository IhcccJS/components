import { FakeApi } from '@ihccc/utils';

const initData = [
  {
    name: '张三',
    phone: '1213',
  },
  {
    name: '李晓',
    phone: '213213',
  },
];

const userList = new FakeApi(initData, {
  queryType: { name: 'like' },
  debug: true,
});

export const query = userList.query.bind(userList);

// 这里的 query 理解为接口调用即可，如下：
//
// function query (data){
//   return fetch('/data', { body: JSON.stringify(data) });
// }
