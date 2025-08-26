import React from 'react';
import { Popover, Empty } from 'antd';
import { Grid } from '@/components/@dev/grid';
import Image from './index';

function GridImages({ column, gap, items, more = [], ...restProps }) {
  return (
    <Grid
      transferStyle
      column={column}
      option={{ gap }}
      template={items
        .map((img, idx) => ({
          key: idx,
          element: <Image src={img} {...restProps} />,
        }))
        .concat(more)}
    />
  );
}

function List({ max, items, showEmpty, ...restProps }) {
  if (showEmpty && (!items || items.length === 0)) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  const [views, overflow] = React.useMemo(() => {
    if (!(max > -1)) return [items, []];
    const views = [...items];
    const overflow = views.splice(max);
    return [views, overflow];
  }, [items, max]);

  return (
    <GridImages
      {...restProps}
      items={views}
      more={
        overflow.length > 0
          ? {
              key: '__more__',
              element: (
                <Popover title="更多" content={<GridImages {...restProps} items={overflow} />}>
                  <a style={{ display: 'flex', alignItems: 'center', padding: '0 12px' }}>查看更多</a>
                </Popover>
              ),
            }
          : []
      }
    />
  );
}

export default List;
