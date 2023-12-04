import React from 'react';
import { Steps } from 'antd';
import { isObject } from '@ihccc/utils';

function StepTitles(props) {
  const { open, current, steps } = props;

  if (!open) return null;

  return (
    <Steps
      size="small"
      current={current}
      items={steps.map((stepProps) => ({
        ...(isObject(stepProps)
          ? stepProps
          : { title: stepProps, key: stepProps }),
      }))}
      style={{ width: '90%', margin: '0 auto 32px' }}
    />
  );
}

export default StepTitles;
