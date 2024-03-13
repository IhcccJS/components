import React from 'react';
import { useUpdate } from 'ahooks';
import columnsHelper from '../columns-helper';
import PluginManage from './plugin-manage';
import PLUGINS from './plugins';

const BaseList = { PLUGINS };

BaseList.use = function createComponentByUsePlugins(plugins) {
  // 用于存放此类型列表已安装的插件
  const _plugin_ = new PluginManage();
  // 将需要的插件添加到 _plugin_ 中
  _plugin_.install(plugins);

  // 在这里可以对插件进行预处理
  // 生成的目标列表组件，列表组件内部根据上述列表的插件创建相应功能的组件
  const ListComponent = React.memo(function ListComponent(props) {
    const { columns } = props;
    const stateRef = React.useRef({});
    const eventMapRef = React.useRef({});
    const update = useUpdate();

    const eventData = {
      state: stateRef.current,
      update,
      methods: eventMapRef.current,
    };

    const listColumns = columnsHelper.useColumns(columns, {
      access: false,
      name: 'list',
      isList: true,
      showIndex: false,
      // actions: actionColumn,
    });

    const elements = _plugin_.createElements({
      ...props,
      columns: listColumns,
    });

    React.useEffect(() => {
      console.log(_plugin_);
      // 在组件挂载时，调用各个插件的初始化方法
      const { initialState, eventMap } = _plugin_.initialize();
      // 初始化 Ref
      stateRef.current = initialState;
      eventMapRef.current = eventMap;
    }, []);

    const rootElements = _plugin_.createRoots({
      ...props,
      ...elements,
      buttons: _plugin_.buttons,
      data: eventData,
    });

    return rootElements;
  });

  if (_plugin_.wappers.length > 0) {
    // 创建包裹组件，以及在 ListComponent 上绑定包裹组件
  }

  return ListComponent;
};

export default BaseList;
