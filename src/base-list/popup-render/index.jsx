import React from 'react';
import { usePopups } from '../hooks';

function PopupRender(props) {
  const { action, behaviors, popups, eventEmitter, loading, onSubmit } = props;

  const __popups__ = usePopups({
    action,
    popups,
    behaviors,
    loading,
    onSubmit,
  });

  React.useEffect(() => {
    if (eventEmitter) {
      eventEmitter.on('popup', __popups__.open);
      eventEmitter.on('popup.close', (key) => __popups__.close[key]());
      return () => {
        eventEmitter.off('popup');
        eventEmitter.off('popup.close');
      };
    }
  }, []);

  return __popups__.element;
}

export default PopupRender;
