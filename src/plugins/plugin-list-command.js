import React from 'react';
import template from 'lodash/template';
import { isArray, isFunction } from '@ihccc/utils';
import useHistory from '../transition-route/useHistory';
import definePlugin from '../create-component/definePlugin';

const isUrlOrPath = (path) => /^http|^\//.test(path);

// 为了兼容不同的方法回调
const getRowData = (context, args) => {
  if (args.length === 2) return { record: args[0].record, data: args[0] };
  return { record: args[1], data: context.data };
};

// TODO 使用 eventMap 而非 command
export default definePlugin({
  name: 'listCommand',
  priority: 'CONTENT',
  props: ['command'],
  before(instance, { command = {} }) {
    const { navigation } = useHistory();

    const eventMap = React.useMemo(() => {
      const events = {};

      for (const key in command) {
        const commandData = command[key];
        const [commandLine, params] = isArray(commandData) ? commandData : [commandData];

        if (typeof commandLine === 'string') {
          events[key] = function () {
            const { data, record } = getRowData(this, arguments);
            const { popup } = data;
            if (isUrlOrPath(commandLine)) {
              navigation('push', template(commandLine)(record));
              return;
            }

            const popupParams = { ...(isFunction(params) ? params(record) : params) };
            // 修改弹窗标题
            if (!!popupParams.title) popupParams.title = template(popupParams.title)(record);

            // FIXME: 要不要在这里默认ID，是否需要调个位置，这可能导致表单dom的 id 变的不确定
            const id = record?.['id'] || '_no_id';
            const { request } = instance.getPlugin('request');
            popup.open(commandLine, { id, record, onSuccess: request.refresh, ...popupParams });
          };
        } else if (typeof commandLine === 'function') {
          events[key] = function () {
            const { record } = getRowData(this, arguments);
            return commandLine?.(record)?.then(() => {
              const { request } = instance.getPlugin('request');
              request.refresh();
            });
          };
        }
      }

      return events;
    }, [command]);

    return { event: eventMap };
  },
});
