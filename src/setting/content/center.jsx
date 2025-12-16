import React from 'react';
import { ImportOutlined, ExportOutlined } from '@ant-design/icons';
import { saveAs } from '@ihccc/utils';
import ButtonList from '../../button-list';
import Card from '../../card';
import Form from '../../form';
import Upload from '../../upload';
import { SettingContext } from '../context';
import ToggleTabs from './toggle-tabs';
import Panel from './panel';

const filterSettingValue = (data) => {
  return Object.keys(data).reduce((store, key) => {
    if (!/^[_A-Z]+$/.test(key)) store[key] = data[key];
    return store;
  }, {});
};

const loadJson = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result));
      } catch (error) {
        reject();
      }
    };
    reader.onerror = reject;
    reader.readAsText(blob, 'utf-8');
  });
};

const saveJson = (data, filename) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename || 'unknow-filename');
};

const buttons = [
  {
    key: 'import',
    props: { icon: <ImportOutlined />, children: '导入本地文件' },
    render: (_data, { onClick }, btn) => (
      <Upload accept=".json" value={[]} onChange={onClick}>
        {React.cloneElement(btn, { onClick: null })}
      </Upload>
    ),
  },
  { key: 'export', props: { type: 'primary', icon: <ExportOutlined />, children: '导出到本地' } },
];

const eventMap = {
  import: async ({ setSetting }, [uploadFile]) => {
    if (!uploadFile) return;
    setSetting(await loadJson(uploadFile.source));
  },
  export: ({ setting, filterSettingValue, exportName }) => {
    const saveData = filterSettingValue(setting);
    saveJson(saveData, [exportName || '系统设置', new Date().toLocaleString().replace(/\/|\s|\:/g, ''), '.json'].join(''));
  },
};

/** 全局设置中心，会显示所有可设置的内容 */
function SettingCenter({ exportName, extraButtons = {} }) {
  const [tab, onTabChange] = React.useState('base');

  const { setting, options, submitButton, onChange } = React.useContext(SettingContext);

  const [gloablForm] = Form.useForm();

  React.useEffect(() => {
    gloablForm.setFieldsValue(setting);
  }, [setting]);

  const globalSetting = (
    <Form
      className="bc-setting-form"
      name="gloabl-setting"
      form={gloablForm}
      group={options.globalGroup.length > 0}
      type="base"
      layout="vertical"
      initialValues={setting}
      gap={'20px'}
      column={2}
      columns={options.global}
      {...(!submitButton ? { onValuesChange: onChange, actionColumn: false } : { onFinish: onChange })}
    >
      <ToggleTabs
        contentStyle={{ maxWidth: 640 }}
        tabs={options.globalGroup.map((group) => ({
          key: group,
          label: options.globalGroupLabel[group] || group,
          children: <Form.Group index={group} />,
        }))}
      />
    </Form>
  );

  const innerOptionList = Object.keys(options.innerOptions);

  const innerPageTab =
    innerOptionList.length === 0
      ? []
      : {
          key: 'advance',
          label: '页面设置',
          children: (
            <ToggleTabs
              contentStyle={{ maxWidth: 640 }}
              tabs={innerOptionList.map((key) => ({
                key,
                label: options.innerOptions[key].name || key,
                children: <Panel prefix={key} key={key} />,
              }))}
            />
          ),
        };

  return (
    <Card
      styles={{ footer: { padding: 'var(--size-cell-gap)' } }}
      tabs={{
        activeKey: tab,
        onChange: onTabChange,
        items: [{ key: 'base', label: '全局设置', children: globalSetting }].concat(innerPageTab),
      }}
      footer={
        <React.Fragment>
          <div style={{ marginBottom: 20 }}>
            <p className="bc-text-desc">* 支持将设置保存到本地</p>
            <p className="bc-text-desc">* 支持导入本地设置</p>
            <p className="bc-text-desc">* 文件格式为 json</p>
          </div>

          <ButtonList
            {...extraButtons}
            buttons={buttons.concat(extraButtons.buttons || [])}
            eventData={{ exportName, setting, setSetting: onChange, filterSettingValue, ...extraButtons.eventData }}
            eventMap={{ ...eventMap, ...extraButtons.eventMap }}
          />
        </React.Fragment>
      }
    />
  );
}

export default SettingCenter;
