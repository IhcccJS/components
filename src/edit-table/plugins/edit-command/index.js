import React from 'react';
import { useApi } from '@ihccc/hooks';
import definePlugin from '../../../create-component/definePlugin';

const none = () => {};

const ListCommand = definePlugin({
  name: 'ListCommand',
  priority: 'TOOL',
  props: ['command'],
  before(instance, { command = {} }) {
    const createCommand = useApi(command.create || none, {
      successCode: '0',
      message: (pass, res) => res.desc || (pass ? '操作成功！' : '操作失败！'),
      onPass: () => {
        const { request } = instance.getPlugin('request');
        request.refresh();
      },
    });

    const updateCommand = useApi(command.update || none, {
      successCode: '0',
      message: (pass, res) => res.desc || (pass ? '操作成功！' : '操作失败！'),
      onPass: () => {
        const { request } = instance.getPlugin('request');
        request.refresh();
      },
    });

    const removeCommand = useApi(command.remove || none, {
      successCode: '0',
      message: (pass, res) => res.desc || (pass ? '操作成功！' : '操作失败！'),
      onPass: () => {
        const { request } = instance.getPlugin('request');
        request.refresh();
      },
    });

    const commandEventMap = React.useMemo(() => {
      const eventMap = {};

      if (command.create) {
        eventMap.create = function ({ record }) {
          createCommand.run(record);
        };
      }

      if (command.update) {
        eventMap.update = function ({ record }) {
          updateCommand.run(record);
        };
      }

      if (command.removeService) {
        eventMap.remove = function ({ record }) {
          removeCommand.run(record);
        };
      }

      return eventMap;
    }, []);

    return {
      event: commandEventMap,

      onSave: (record) => {
        return false;
      },
    };
  },
});

export default ListCommand;
