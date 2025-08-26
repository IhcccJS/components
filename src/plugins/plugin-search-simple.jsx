import React from 'react';
import Form from '@/components/@comp/common-form';
import { definePlugin } from '@/components/@comp/create-component';

export default definePlugin({
  name: 'searchNormal',
  priority: (priority) => priority.CONTENT + 1,
  required: ['layout', 'request'],
  props: [],
  main(instance, props) {
    const { namespace, columns, searchSimple = {} } = props;

    const { request } = instance.getPlugin('request');

    const buttonBar = (
      <Form
        {...searchSimple}
        namespace={namespace}
        layout="inline"
        variant="filled"
        columns={columns}
        name="search"
        grid={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }}
        onFinish={(values) => request.search(values)}
        trigger={<Form.Trigger.Search foldAble={false} />}
      />
    );

    return { buttonBar };
  },
});
