// import React from 'react';
import Popuper from '../popuper';
import definePlugin from '../create-component/definePlugin';

export default definePlugin({
  name: 'popup',
  priority: 'COLLECTING',
  props: ['namespace', 'popup'],
  collection: () => ({ popup: [] }),
  expose: [{ name: 'popup', source: 'popup' }],
  main(instance, props) {
    const { namespace, popup: userPopup } = props;

    const { popup } = Popuper.usePopuper({
      namespace,
      items: [...(instance.collection.popup || []), ...(userPopup || [])],
    });

    return { popup };
  },
});
