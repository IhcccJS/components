import React from 'react';
import { isNumber, isArray, isFunction } from '@ihccc/utils';

function useSteps(steps, { onStep, onPrevious, onNext }) {
  const [current, setCurrent] = React.useState(0);

  const initState = React.useMemo(() => {
    const open = isArray(steps);
    let length = 0;
    if (open) length = steps.length;
    else if (isNumber(steps)) length = steps;
    return { length, open, hasStep: length > 0 };
  }, [steps]);

  const state = React.useMemo(
    () => ({
      isFirst: current === 0,
      isLast: current === initState.length - 1,
    }),
    [current, initState.length],
  );

  const handleStep = React.useCallback(
    async () => isFunction(onStep) && (await onStep(current)),
    [current, onStep],
  );

  const handlePrevious = React.useCallback(async () => {
    if (current > 0) {
      await handleStep();
      setCurrent(current - 1);
      isFunction(onPrevious) && onPrevious();
    }
  }, [current, handleStep]);

  const handleNext = React.useCallback(async () => {
    if (current < initState.length - 1) {
      await handleStep();
      setCurrent(current + 1);
      isFunction(onNext) && onNext();
    }
  }, [current, initState.length, handleStep]);

  return {
    current,
    setCurrent,
    initState,
    state,
    handleStep,
    handlePrevious,
    handleNext,
  };
}

export default useSteps;
