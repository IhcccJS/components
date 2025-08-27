// import React from 'react';
import Popuper from '../popuper';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'modalManage',
  priority: 'COLLECTING',
  props: ['namespace', 'modal'],
  collection: () => ({ modalItem: [] }),
  expose: [{ name: 'modal', source: 'modal' }],
  main(instance, props) {
    const { namespace, modal: userModal } = props;

    const { modal } = Popuper.usePopuper({
      namespace,
      items: [...(instance.collection.modalItem || []), ...(userModal || [])],
    });

    return {
      modal: modal,
    };
  },
});
