import React from 'react';

const useFullscreen = (full, targetRef) => {
  React.useLayoutEffect(() => {
    if (targetRef.current) {
      if (full) {
        targetRef.current.style.setProperty('position', 'fixed');
        targetRef.current.style.setProperty('top', '0');
        targetRef.current.style.setProperty('left', '0');
        targetRef.current.style.setProperty('right', '0');
        targetRef.current.style.setProperty('bottom', '0');
        targetRef.current.style.setProperty('z-index', '999');
        targetRef.current.style.setProperty('padding', '20px');
        targetRef.current.style.setProperty('max-height', '100vh');
        targetRef.current.style.setProperty('overflow', 'auto');
        targetRef.current.style.setProperty('background', '#f5f5f5');
        document.body.style.setProperty('overflow', 'hidden');
      } else {
        targetRef.current.removeAttribute('style');
        document.body.removeAttribute('style');
      }
    }
  }, [full]);
};

export default useFullscreen;
