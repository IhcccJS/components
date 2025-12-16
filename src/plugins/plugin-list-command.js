import React from 'react';
import template from 'lodash/template';
import { isArray, isFunction } from '@ihccc/utils';
import useHistory from '../transition-route/useHistory';
import definePlugin from '../create-component/definePlugin';

const isUrlOrPath = (path) => /^http|^\//.test(path);

// TODO 使用 eventMap 而非 command
export default definePlugin({
  name: 'listCommand',
  priority: 'CONTENT',
  props: ['command'],
  before(_instance, { command = {}, rowKey = 'id' }) {
    const { navigation } = useHistory();

    const eventMap = React.useMemo(() => {
      const events = {};

      for (const key in command) {
        const commandData = command[key];
        const [commandLine, params] = isArray(commandData) ? commandData : [commandData];

        if (typeof commandLine === 'string') {
          events[key] = function (eventData) {
            const { popup, record } = eventData;
            if (isUrlOrPath(commandLine)) {
              navigation('push', template(commandLine)(record));
              return;
            }

            const popupParams = { ...(isFunction(params) ? params(record) : params) };
            // 修改弹窗标题
            if (!!popupParams.title) popupParams.title = template(popupParams.title)(record);

            // FIXME: 要不要在这里默认ID，是否需要调个位置，这可能导致表单dom的 id 变的不确定
            const id = record?.[popupParams.rowKey || rowKey] || '_no_id';
            popup.open(commandLine, { id, record, eventData, onSuccess: eventData.request.refresh, ...popupParams });
          };
        } else if (typeof commandLine === 'function') {
          events[key] = function (eventData) {
            const eventResult = commandLine.call(eventData, eventData.record);
            if (!eventResult.then) return;
            return eventResult.then(() => {
              eventData.request.refresh();
            });
          };
        }
      }

      return events;
    }, [command]);

    return { eventMap };
  },
});
