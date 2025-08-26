import React from 'react';
import { Tour } from 'antd';
import { TourContext } from './context';

function TourProvider({ options, tourProps, eventEmitter, children }) {
  const [step, setStep] = React.useState({});

  const setOpen = React.useCallback((name, index) => {
    setStep(!name ? {} : { name, index: index || 0 });
  }, []);

  const setIndex = React.useCallback((index) => {
    setStep((step) => ({ ...step, index: index || 0 }));
  }, []);

  const tourList = React.useMemo(() => {
    return Object.keys(options).reduce((store, key) => {
      const tour = options[key];
      if (!store[tour.group]) store[tour.group] = [];
      store[tour.group].push({ key, label: tour.label, description: tour.description });
      return store;
    }, {});
  }, [options]);

  const tourConfig = React.useMemo(() => {
    if (!step.name) return {};
    return options[step.name] || {};
  }, [step]);

  React.useEffect(() => {
    if (!eventEmitter) return;

    eventEmitter.on('tour/open', setOpen);
    eventEmitter.on('tour/index', setIndex);

    return () => {
      eventEmitter.off('tour/open', setOpen);
      eventEmitter.off('tour/index', setIndex);
    };
  }, []);

  return (
    <TourContext.Provider value={{ step, setOpen, tourList }}>
      {children}
      <Tour
        disabledInteraction
        {...tourProps}
        open={!!step.name}
        current={step.index}
        steps={tourConfig.steps}
        onChange={async (index) => {
          // TODO onPrevStep
          const step = tourConfig.steps[index - 1];
          await step?.onNextStep?.();
          setIndex(index);
        }}
        onClose={() => {
          tourConfig.onClose?.();
          setOpen();
        }}
        onFinish={tourConfig.onFinish}
        // actionsRender={actionsRender}
      />
    </TourContext.Provider>
  );
}

export default TourProvider;
