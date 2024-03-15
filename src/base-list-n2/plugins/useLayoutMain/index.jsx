import React from 'react';
import { Flex } from 'antd';

const cardStyle = { background: '#fff', borderRadius: 8, padding: 16 };

function useLayoutMain(instance, props) {
  return {
    name: 'layoutMain',
    layout: React.forwardRef(({ head, buttonBar, children }, ref) => (
      <div ref={ref} style={{ background: '#f5f5f5', padding: 16 }}>
        <div style={{ ...cardStyle, marginBottom: 16, paddingBottom: 0 }}>
          {head}
        </div>
        <div style={cardStyle}>
          <Flex>
            {props.leftRender}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 16 }}>{buttonBar}</div>
              {children}
            </div>
          </Flex>
        </div>
      </div>
    )),
  };
}

export default useLayoutMain;
