import React from 'react';
import Form from '@/components/@comp/common-form-v2';
import { SettingContext } from '../context';

/** 部分页面可以显示的设置内容，也允许显示一部分全局设置 */
function SettingPanel(props) {
  const { prefix } = props;

  const { initailValues, options, submitButton, onChange } = React.useContext(SettingContext);

  const currentOptions = options.innerOptions[prefix] || {};

  const [panelForm] = Form.useForm();

  React.useEffect(() => {
    panelForm.setFieldsValue(initailValues);
  }, [initailValues]);

  return (
    <Form
      className="bc-setting-form"
      form={panelForm}
      // group
      type="base"
      layout="vertical"
      initialValues={initailValues}
      gap={'20px'}
      column={2}
      columns={currentOptions.columns || []}
      {...(!submitButton ? { onValuesChange: onChange, actionColumn: false } : { onFinish: onChange })}
    />
  );
}

export default SettingPanel;
