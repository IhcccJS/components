// 传递全局变量、方法
// location、history
// 组件库 icons，默认使用内置 @ant-design/icons 引入的 icons
import React from 'react';
import ThemeProvider from '../theme/provider';
import SettingProvider from '../setting/provider';
// import TransitionRoute from '@/components/@dev/transition-route/animation';
import ImagePreview from '../image/preview';
import { ConfigContext } from './context';

function Config({
  icons,
  location,
  history,
  actionColumn,
  link,
  themeSystem,
  settingSystem,
  tourSystem,
  noticeSystem,
  popupSystem,
  accessSystem,
  imagePreview,
  children,
}) {
  let child = children;

  // 主题管理
  if (themeSystem) {
    child = <ThemeProvider {...themeSystem}>{child}</ThemeProvider>;
  }

  // 设置管理
  if (settingSystem) {
    child = <SettingProvider {...settingSystem}>{child}</SettingProvider>;
  }

  // 用户引导
  if (tourSystem) {
    child = <React.Fragment>{child}</React.Fragment>;
  }

  // 通知管理
  if (noticeSystem) {
    child = <React.Fragment>{child}</React.Fragment>;
  }

  // 弹窗管理
  if (popupSystem) {
    child = <React.Fragment>{child}</React.Fragment>;
  }

  // 权限管理
  if (accessSystem) {
    child = <React.Fragment>{child}</React.Fragment>;
  }

  // 图片预览
  if (imagePreview) {
    child = <ImagePreview {...imagePreview}>{child}</ImagePreview>;
  }

  return (
    <ConfigContext.Provider
      value={{
        icons,
        location,
        history,
        actionColumn,
        link,
      }}
    >
      {child}
    </ConfigContext.Provider>
  );
}

export default Config;
