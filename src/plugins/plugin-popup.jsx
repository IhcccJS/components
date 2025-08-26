// import React from 'react';
import Modaler from '@/components/@comp/modaler';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'modalManage',
  priority: 'COLLECTING',
  props: ['namespace', 'modal'],
  collection: () => ({ modalItem: [] }),
  expose: [{ name: 'modal', source: 'modal' }],
  main(instance, props) {
    const { namespace, modal: userModal } = props;

    const { modal } = Modaler.useModaler({
      namespace,
      items: [...(instance.collection.modalItem || []), ...(userModal || [])],
    });

    return {
      modal: modal,
    };
  },
});
