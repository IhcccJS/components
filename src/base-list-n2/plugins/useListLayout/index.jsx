import React from 'react';

function useListLayout(instance, props) {
  return {
    layout: ({ head, children }) => (
      <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
        <div style={{ marginBottom: 10, fontSize: 18, fontWeight: 600 }}>
          {head}
        </div>
        <div>{children}</div>
      </div>
    ),
  };
}

export default useListLayout;
