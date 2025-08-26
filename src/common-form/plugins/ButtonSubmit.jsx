import React from 'react';
import ButtonList from '@/components/@comp/button-list';
import { definePlugin } from '@/components/@comp/create-component';

const ButtonSubmit = definePlugin({
  name: 'ButtonSubmit',
  priority: 'CONTENT',
  props: ['column', 'resetButtonProps', 'submitButtonProps'],
  main(_, { column, resetButtonProps, submitButtonProps }) {
    return {
      actionColumn: {
        key: '$$action',
        group: '$$action',
        colSpan: column,
        style: { alignItems: 'flex-start' },
        element: (
          <ButtonList
            buttons={[
              { key: 'reset', props: { htmlType: 'reset', children: '重置', ...resetButtonProps } },
              { key: 'submit', props: { htmlType: 'submit', type: 'primary', children: '提交', ...submitButtonProps } },
            ]}
          />
        ),
      },
    };
  },
});

export default ButtonSubmit;
