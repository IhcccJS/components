import { ApiMock } from '@ihccc/utils';

const initData = [
  {
    name: '张三',
    username: 'abc',
    phone: '17844446666',
    sex: '0',
    enable: '1',
    progress: 78.21,
    tags: '1,2,4,5,6',
  },
  {
    name: '李晓',
    username: 'asss',
    phone: '18812341234',
    sex: '1',
    enable: '0',
    progress: 34.08,
    tags: '2,3,6',
  },
  {
    name: '王六',
    username: 'bac2',
    phone: '15634347272',
    sex: '1',
    enable: '0',
    progress: 89.1,
    tags: '1,2,3,4,5,6',
  },
];

const userList = new ApiMock(initData, {
  queryType: {
    id: 'is',
    name: 'like',
    username: 'like',
    phone: 'like',
    sex: 'is',
    enable: 'is',
  },
  timeout: [200, 500],
  debug: true,
});

export const list = userList.list.bind(userList);

export const create = userList.create.bind(userList);

export const update = userList.update.bind(userList);

export const remove = userList.remove.bind(userList);
