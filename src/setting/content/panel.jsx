import React from 'react';
import Form from '../../form';
import { SettingContext } from '../context';

/** 部分页面可以显示的设置内容，也允许显示一部分全局设置 */
function SettingPanel(props) {
  const { prefix } = props;

  const { setting, options, submitButton, onChange } = React.useContext(SettingContext);

  const currentOptions = options.innerOptions[prefix] || {};

  const [panelForm] = Form.useForm();

  React.useEffect(() => {
    panelForm.setFieldsValue(setting);
  }, [setting]);

  return (
    <Form
      className="bc-setting-form"
      form={panelForm}
      // group
      type="base"
      layout="vertical"
      initialValues={setting}
      gap={'20px'}
      column={2}
      columns={currentOptions.columns || []}
      {...(!submitButton ? { onValuesChange: onChange, actionColumn: false } : { onFinish: onChange })}
    />
  );
}

export default SettingPanel;
