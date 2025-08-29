import { FakeApi } from '@ihccc/utils';

export const initData = [
  { id: 'id-developer', name: '开发者', key: 'developer', enable: 1, remark: '开发者' },
  { id: 'id-admin', name: '管理员', key: 'admin', enable: 1, remark: '系统管理员' },
  { id: 'id-user', name: '普通用户', key: 'user', enable: 0, remark: '系统用户' },
  { id: 'id-guest', name: '访客', key: 'guest', enable: 1, remark: '访客' },
];

export const roleList = new FakeApi(initData, {
  queryType: { id: 'is', name: 'like', key: 'like', enable: 'is' },
  sort: () => 0,
});

export const query = roleList.query.bind(roleList);
export const create = roleList.create.bind(roleList);
export const update = roleList.update.bind(roleList);
export const remove = roleList.remove.bind(roleList);
export const profile = roleList.profile.bind(roleList);
