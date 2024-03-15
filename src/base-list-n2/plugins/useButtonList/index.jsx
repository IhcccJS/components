import React from 'react';
import ButtonList from '../../../button-list';

function useButtonList(instance, props) {
  const { request } = instance.getPlugin('request');
  const { modal } = instance.getPlugin('modalManage');

  return {
    name: 'buttonList',
    buttonBar: React.memo(() => (
      <ButtonList
        space="divider"
        type="button"
        layout="end"
        buttons={instance.elements.button}
        baseProps={
          {
            // button: { size: 'small', shape: 'round' },
          }
        }
        data={{ request, modal }}
        eventMap={instance.elements.event}
      />
    )),
  };
}

export default useButtonList;
