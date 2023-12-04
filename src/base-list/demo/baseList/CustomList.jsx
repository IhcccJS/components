import React from 'react';
import { Card } from 'antd';
import { Detail } from '@ihccc/components';

function CustomList(props) {
  const {
    allSelectionDom,
    // rowSelectionDom,
    // allSelected,
    // allSelectEvent,
    rowSelectionEvents,
    dataSource,
    columns,
    rowKey,
  } = props;

  return (
    <React.Fragment>
      <div style={{ position: 'absolute', top: 30, left: 30 }}>
        {allSelectionDom}
      </div>
      {dataSource.map((item, index) => (
        <div
          style={{ display: 'inline-block', width: '20%', padding: '10px' }}
          key={item[rowKey]}
        >
          <Card
            style={
              rowSelectionEvents[index].active
                ? {
                    background:
                      'linear-gradient(45deg, rgb(228, 213, 255), rgb(215, 236, 255))',
                  }
                : {}
            }
            onClick={rowSelectionEvents[index].onSelect}
          >
            <img src="/哆啦A梦.png" width="180px" alt="avatar" />
            <Detail data={item} columns={columns} column={1} gap="12px">
              <Detail.Item layout="horizontal" />
            </Detail>
          </Card>
        </div>
      ))}
    </React.Fragment>
  );
}

export default CustomList;
