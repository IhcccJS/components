import React from 'react';
import { useUnmountedRef } from 'ahooks';
import transform from './transform';
import { useMatchSomeAccess } from '../access/useAccess';

function useColumns(columns, opts) {
  const { access: accessConfig, ...config } = opts || {};
  const unmountedRef = useUnmountedRef();
  const [source, setSource] = React.useState([]);

  const matchAccess = useMatchSomeAccess({ keyName: 'dataIndex', ...accessConfig });

  React.useEffect(() => {
    if (unmountedRef.current) return;
    // 对 columns 权限过滤
    const filteredData = !matchAccess ? columns : matchAccess.filter(columns);
    setSource(filteredData);
  }, [columns]);

  // 渲染处理
  const data = React.useMemo(() => transform(source, config), [source, config]);

  // 可以通过 source 和 setSource 进行中间处理
  return { source, setSource, data };
}

export default useColumns;
