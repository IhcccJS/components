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
      eventData={{ ...instance.expose, ...instance.collection.eventData, ...eventData }}
      eventMap={{ ...instance.collection.eventMap, ...eventMap }}
      style={{ flex: 1 }}
    />
  );
}

export default definePlugin({
  name: 'extraButtons',
  priority: 'CONTENT',
  required: ['layout'],
  props: ['extraButtons', 'eventData', 'eventMap'],
  collection: () => ({ button: [], eventData: {}, eventMap: {} }),
  content: { buttonBar: Buttons },
});
