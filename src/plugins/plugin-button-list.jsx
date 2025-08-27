import React from 'react';
import definePlugin from '../create-component/definePlugin';
import ButtonList from '../button-list';

function Buttons({ instance, extraButtons = {}, eventData, eventMap }) {
  return (
    <ButtonList
      space="divider"
      type="button"
      layout="end"
      // baseProps={{
      //   button: { shape: 'round' },
      // }}
      {...extraButtons}
      buttons={!extraButtons.buttons ? instance.collection.button : instance.collection.button.concat(extraButtons.buttons)}
      data={{ ...instance.expose, ...instance.collection.data, ...eventData }}
      eventMap={{ ...instance.collection.event, ...eventMap }}
      style={{ flex: 1 }}
    />
  );
}

export default definePlugin({
  name: 'extraButtons',
  priority: 'CONTENT',
  required: ['layout'],
  props: ['extraButtons', 'eventData', 'eventMap'],
  collection: () => ({ button: [], data: {}, event: {} }),
  content: { buttonBar: Buttons },
});
