import { FakeApi } from '@ihccc/utils';

const initData = [
  {
    name: '张三',
    username: 'abc',
    phone: '1213',
    sex: '0',
    enable: '1',
  },
  {
    name: '李晓',
    username: 'asss',
    phone: '213213',
    sex: '1',
    enable: '0',
  },
  {
    name: '王六',
    username: 'bac2',
    phone: '2321312',
    sex: '1',
    enable: '0',
  },
];

const userList = new FakeApi(initData, {
  queryType: {
    id: 'is',
    name: 'like',
    username: 'like',
    phone: 'like',
    sex: 'is',
    enable: 'is',
  },
  debug: true,
});

export const query = userList.query.bind(userList);

export const create = userList.create.bind(userList);

export const update = userList.update.bind(userList);

export const remove = userList.remove.bind(userList);

export const profile = userList.profile.bind(userList);
