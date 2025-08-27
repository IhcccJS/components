import React from 'react';
import definePlugin from '../../create-component/definePlugin';

function useStep(form, defaultStep = 0) {
  const valueRef = React.useRef({});
  const [step, setStep] = React.useState(defaultStep);

  const handleStep = (index) => {
    if (index > step) {
      form.validateFields().then((values) => {
        Object.assign(valueRef.current, values);
        setStep(index);
      });
    } else {
      Object.assign(valueRef.current, form.getFieldsValue());
      setStep(index);
    }
    setTimeout(() => {
      form.setFieldsValue(valueRef.current);
    }, 0);
  };

  return { step, setStep: handleStep, value: valueRef.current };
}

const FormStep = definePlugin({
  name: 'FormStep',
  priority: 'LOW',
  required: ['FormGroup'],
  subComponent: { useStep },
});

export default FormStep;
