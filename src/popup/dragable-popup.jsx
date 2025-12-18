import React from 'react';
import Popup from './popup';
import clsx from 'clsx';
import Draggable from 'react-draggable';

const HANDLE_CLASS = 'bc-popup-drag-handler';

function DragablePopup(props) {
  const { dragAble = true, handleClassName, classNames = {}, ...restProps } = props;
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
    // setBounds({
    //   left: -targetRect.left + 64,
    //   right: clientWidth + (targetRect.right - 64),
    //   top: -targetRect.top + uiData.y,
    //   bottom: clientHeight + 64,
    // });
  }, []);

  return (
    <Popup
      classNames={{ ...classNames, title: clsx(HANDLE_CLASS, classNames.title) }}
      popupRender={(popupNode, wrapperProps) =>
        !dragAble ? (
          popupNode
        ) : (
          <Draggable handle={'.' + (handleClassName || HANDLE_CLASS)} bounds={bounds} onStart={onStart}>
            <div ref={draggleRef} className={wrapperProps.className} style={wrapperProps.style}>
              {popupNode}
            </div>
          </Draggable>
        )
      }
      {...restProps}
    />
  );
}

export default DragablePopup;
