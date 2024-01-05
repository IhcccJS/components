import React from 'react';

function useForwardRef(ref) {
  const currentRef = React.useRef();
  React.useLayoutEffect(() => {
    if (!ref) return;
    ref.current = currentRef.current;
  }, [ref]);
  return currentRef;
}

export default useForwardRef;
