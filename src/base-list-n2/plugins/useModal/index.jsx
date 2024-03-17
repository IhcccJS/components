import React from 'react';
import Modaler from '../../../modaler';

function useModal() {
  const ref = React.useRef();

  return {
    name: 'modalManage',

    modal: ref.current,

    props: ['namespace', 'modals'],

    content: React.memo((props) => {
      const { namespace, modals } = props;

      const { modal, elements } = Modaler.useModaler({
        namespace,
        items: modals,
      });

      React.useImperativeHandle(ref, () => modal, []);

      return elements;
    }),
  };
}

export default useModal;
