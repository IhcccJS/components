import SettingProvider from './provider';
import useSetting from './useSetting';
import SettingCenter from './content/center';
import SettingPanel from './content/panel';
import { SettingContext } from './context';

export { SettingProvider, useSetting, SettingCenter, SettingPanel, SettingContext };

const Setting = {
  Provider: SettingProvider,
  Center: SettingCenter,
  Panel: SettingPanel,
  useSetting,
  Context: SettingContext,
};

export default Setting;
