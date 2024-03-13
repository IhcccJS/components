import React from 'react';

function useDemoCount(instance, props) {
  const [count, setCount] = React.useState(0);

  console.log('count update!');

  return {
    content: (
      <div>
        <span>count: {count}</span>
        <button onClick={() => setCount(count + 1)} style={{ marginLeft: 8 }}>
          增加
        </button>
      </div>
    ),
  };
}

export default useDemoCount;
