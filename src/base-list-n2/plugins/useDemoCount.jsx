import React from 'react';

function useDemoCount(instance, props) {
  // return {
  //   content: () => {
  //     const [count, setCount] = React.useState(0);
  //     return (
  //       <div>
  //         <span>count: {count}</span>
  //         <button onClick={() => setCount(count + 1)} style={{ marginLeft: 8 }}>
  //           增加
  //         </button>
  //       </div>
  //     );
  //   },
  // };

  // const [count, setCount] = React.useState(0);

  // return {
  //   content: () => {
  //     return (
  //       <div>
  //         <span>count: {count}</span>
  //         <button onClick={() => setCount(count + 1)} style={{ marginLeft: 8 }}>
  //           增加
  //         </button>
  //       </div>
  //     );
  //   },
  // };

  const [count, setCount] = React.useState(0);

  return {
    name: 'count',
    button: [
      {
        key: 'count',
        props: { children: count },
        onClick: () => setCount(count + 1),
      },
    ],
  };
}

export default useDemoCount;
