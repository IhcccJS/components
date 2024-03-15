import React from 'react';
import Form from '../../../common-form';
import { Search } from '../../../common-form/trigger';

function useSearchNormal(instance) {
  const { request } = instance.getPlugin('request');

  const head = React.memo((props) => {
    const [fold, setFold] = React.useState(false);
    return (
      <Form
        name="search"
        grid={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}
        max={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }}
        trigger={
          <Search
            full
            important
            loading={request.loading}
            // foldAble={foldAble}
            fold={fold}
            onFold={() => setFold((f) => !f)}
            style={{ textAlign: 'right' }}
          />
        }
        {...props}
        onFinish={() => request.run()}
      />
    );
  });

  return {
    name: 'searchNormal',
    head,
    props: ['namespace', 'columns'],
  };
}

export default useSearchNormal;
