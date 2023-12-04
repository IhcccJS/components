import React from 'react';
import { isArray } from '@ihccc/utils';

function usePopups(opts = {}) {
  const { action, popups, behaviors, loading, onSubmit } = opts;
  const [popupsProps, setPopupsProps] = React.useState({});

  // 控制弹窗
  const open = (popupProps) => {
    const behavior = behaviors[popupProps.type];
    if (!behavior) return;
    setPopupsProps((popupsProps) => ({
      ...popupsProps,
      [behavior]: { open: true, ...popupProps },
    }));
  };

  const close = React.useMemo(() => {
    const events = {};
    if (isArray(popups)) {
      popups.forEach((popup) => {
        events[popup.key] = () => {
          setPopupsProps((popupsProps) => ({
            ...popupsProps,
            [popup.key]: { ...popupsProps[popup.key], open: false },
          }));
        };
      });
    }
    return events;
  }, []);

  // 弹出层组件
  const element = React.useMemo(
    () =>
      isArray(popups) &&
      popups.map((popup) => {
        const props = Object.assign(
          {
            loading: loading?.create || loading?.update || false,
            onCancel: close[popup.key],
          },
          action?.[popupsProps[popup.key]?.type] ? { onSubmit } : {},
          popupsProps[popup.key],
        );
        return React.cloneElement(popup, props);
      }),
    [loading?.create, loading?.update, popupsProps, onSubmit],
  );

  return {
    open,
    close,
    element,
  };
}

export default usePopups;
