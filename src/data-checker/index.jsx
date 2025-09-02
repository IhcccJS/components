import React from 'react';
import { Spin, Empty } from 'antd';
import { isArray, isObject, isFunction } from '@ihccc/utils';

function DataChecker(props) {
  const { loading = false, data, alias = 'data', empty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />, children, ...restProps } = props;

  const hasData = React.useMemo(() => {
    if (isObject(data)) return Object.keys(data).length > 0;
    else if (isArray(data)) return data.length > 0;
    return false;
  }, [data]);

  const childrenNode = () => {
    if (hasData) {
      const childrenProps = Object.assign({ [alias]: data }, restProps);
      if (React.isValidElement(children)) return React.cloneElement(children, childrenProps);
      if (isFunction(children)) return children(childrenProps);
    }
    return empty;
  };

  return <Spin spinning={loading} children={childrenNode()} />;
}

export default DataChecker;
