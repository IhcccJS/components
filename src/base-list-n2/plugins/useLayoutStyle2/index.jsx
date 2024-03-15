import React from 'react';

const cardStyle = {
  background: '#fff',
  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.1)',
  padding: 16,
};

function useLayoutMain(instance, props) {
  return {
    name: 'layoutMain',
    layout: React.forwardRef(({ head, buttonBar, children }, ref) => (
      <div ref={ref} style={{ background: '#f5f5f5', padding: 16 }}>
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}>{buttonBar}</div>
          <div>{head}</div>
          <div>{children}</div>
        </div>
      </div>
    )),
  };
}

export default useLayoutMain;
