import React from 'react';
import { Modal, Form, Drawer, Spin } from 'antd';
import { isFunction } from '@ihccc/utils';
import StepTitles from './steps';
import Footer from './footer';
import CommonForm from '../../common-form';
import { useTitle, useValue, useSteps } from '../hooks';
import { cloneSomeChildren } from '../../utils/base';

const VIEWMODES = {
  modal: Modal,
  drawer: Drawer,
  none: React.Fragment,
};

const propsName = {
  modal: { cancel: 'onCancel' },
  drawer: { cancel: 'onClose' },
};

const Updater = (props) => {
  const {
    type,
    loading,
    title,
    mode,
    form,
    remain,
    initialValues,
    onlyFormValue,
    steps,
    showSubmitOnStep,
    resetButtonProps,
    okButtonProps,
    footer,
    children,
    onStep,
    onCancel,
    onSubmit,
    onValidateFailed,
    whichGetProps,
    ...restProps
  } = props;

  const isCreate = type === 'create';

  const [formInstance] = CommonForm.useForm(form);
  const formRef = React.useRef();

  const titleText = useTitle(title, type);

  const {
    loading: fetching,
    defaultValue,
    value,
    setDefaultValue,
    setMergeValue,
    resetValue,
  } = useValue(initialValues, {
    // enable: restProps.open,
    remain: restProps.open && isCreate && remain,
  });

  const handleStep = React.useCallback(
    async (current) => {
      try {
        const currentValues = await formInstance.validateFields();
        setMergeValue(currentValues);
        onStep && onStep(current, currentValues, value);
        return currentValues;
      } catch (error) {
        if (onValidateFailed) onValidateFailed(error);
        throw error;
      }
    },
    [formInstance, value, onStep],
  );

  const { current, setCurrent, initState, state, handlePrevious, handleNext } =
    useSteps(steps, {
      onStep: handleStep,
    });

  const handleCancel = () => {
    isFunction(onCancel) && onCancel();
    setCurrent(0);
    if (remain) return;
    setDefaultValue({});
    resetValue();
  };

  const handleSubmit = async ({ type }) => {
    const formValue = await handleStep();
    const formData = onlyFormValue
      ? formValue
      : Object.assign({}, value, formValue);
    isFunction(onSubmit) && (await onSubmit(formData, type));
    handleCancel();
  };

  React.useEffect(() => {
    if (restProps.open) {
      formInstance.resetFields();
      formInstance.setFieldsValue(value);
    }
  }, [restProps.open, value, current]);

  const Container = React.useMemo(() => VIEWMODES[mode] || VIEWMODES.none, []);

  const renderChildrenNodes = cloneSomeChildren(
    children,
    {
      popupType: type,
      form: formInstance,
      preserve: false,
      current: current,
      initialValues: defaultValue,
      formRef: formRef,
    },
    whichGetProps,
  );

  const ButtonFooter =
    isFunction(footer) &&
    footer({
      data: {
        type,
        loading,
        hasSteps: initState.hasStep,
        isFirstStep: state.isFirst,
        isLastStep: state.isLast,
        showSubmit:
          !initState.hasStep ||
          showSubmitOnStep === true ||
          current >= showSubmitOnStep ||
          state.isLast,
        resetButtonProps: resetButtonProps,
        okButtonProps: okButtonProps,
        onSubmit: handleSubmit,
        onPrevious: handlePrevious,
        onNext: handleNext,
        onReset: () => {
          formRef.current?.initRelationFields();
          resetValue();
        },
      },
    });

  return React.createElement(
    Container,
    !!propsName[mode]
      ? {
          ...restProps,
          title: titleText,
          forceRender: true,
          destroyOnClose: true,
          footer: ButtonFooter,
          [propsName[mode].cancel]: handleCancel,
        }
      : void 0,
    <Spin spinning={fetching}>
      <StepTitles open={initState.open} current={current} steps={steps} />
      {renderChildrenNodes}
    </Spin>,
    mode === 'none' ? ButtonFooter : void 0,
  );
};

Updater.defaultProps = {
  mode: 'modal',
  footer: Footer,
  whichGetProps: (child) => child?.type === Form || child?.type === CommonForm,
};

export default Updater;
