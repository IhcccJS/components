import React from 'react';
import { Form } from 'antd';
import definePlugin from '../../create-component/definePlugin';

function FormLayout(props) {
  const { instance, form, children } = props;
  // FIXME 原始 props 调用 getSourceProps 获取
  const formProps = instance.getSourceProps();
  const provider = instance.collection.provider;
  const onFormValuesChange = instance.collection.onFormValuesChange;
  const content = instance.collection.content;

  const handleValuesChange = React.useCallback((...args) => {
    onFormValuesChange.forEach((change) => change && change(...args));
    formProps.onValuesChange?.(...args);
  }, []);

  const formNode = (
    <Form {...formProps} form={form} onValuesChange={handleValuesChange}>
      {content}
      {children}
    </Form>
  );

  if (provider.length === 0) return formNode;

  return provider.reduce((child, Provider) => <Provider {...props}>{child}</Provider>, formNode);
}

const FormView = definePlugin({
  name: 'FormView',
  priority: 'Layout',
  props: ['form'],
  subComponent: { Item: Form.Item, useForm: Form.useForm },
  expose: [{ name: 'formInstance', source: 'form' }],
  elementKeys: ['content'],
  collection() {
    return {
      layout: FormLayout,
      provider: [],
      content: [],
      form: null,
      onFormValuesChange: [],
    };
  },
  main(_, props) {
    const { form } = props;

    const [formInstance] = Form.useForm(form);

    return { form: formInstance };
  },
});

export default FormView;
