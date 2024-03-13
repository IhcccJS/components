import React from 'react';
import { BaseListContext } from '../context';

function useListState(namespace, initialData) {
  const listContext = React.useContext(BaseListContext);

  if (listContext.enable) {
    if (!namespace) {
      throw new Error(
        '使用了 <StateCenter /> 请在 useList 配置内声明 namespace ！！！',
      );
    }
    return [
      listContext.state[namespace] || initialData || {},
      listContext.setState.bind(null, namespace, initialData),
    ];
  }

  return React.useState(initialData);
}

export default useListState;
