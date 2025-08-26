import React from 'react';
import Draggable from 'react-draggable';

const useDrag = (opts) => {
  if (!opts.enable) return {};
  const [bounds, setBounds] = React.useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = React.useRef(null);

  const onStart = React.useCallback((_, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) return;
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  }, []);

  const modalRender = React.useCallback(
    (modal) => (
      <Draggable handle={opts.handle} bounds={bounds} onStart={onStart}>
        <div ref={draggleRef} className={opts.className} onClick={opts.onMouseDown}>
          {modal}
        </div>
      </Draggable>
    ),
    [bounds, onStart, opts.className, opts.onMouseDown],
  );

  return { modalRender };
};

export default useDrag;
