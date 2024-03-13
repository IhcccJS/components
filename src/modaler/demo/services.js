import { FakeApi } from '@ihccc/utils';

const initData = [
  {
    name: '张三',
    age: 23,
    address: '北京市',
  },
  {
    name: '李晓',
    age: 24,
    address: '上海市',
  },
];

const userList = new FakeApi(initData, {
  queryType: {
    id: 'is',
    name: 'like',
  },
  debug: true,
});

export const query = userList.query.bind(userList);

export const create = userList.create.bind(userList);

export const update = userList.update.bind(userList);

export const remove = userList.remove.bind(userList);

export const profile = userList.profile.bind(userList);
