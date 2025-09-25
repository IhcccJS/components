import React from 'react';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import ButtonList from '../../button-list';
import Form from '../../form';
import definePlugin from '../../create-component/definePlugin';

export default definePlugin({
  name: 'searchNormal',
  priority: 'CONTENT',
  props: [],
  main(instance, props) {
    const { search = {}, request: userRequest, columns = [], column = 6 } = props;

    const { request } = instance.getPlugin('request');

    const [searchVisible, setSearchVisible] = React.useState(true);

    if (search.visible === false) return;

    const head = !searchVisible ? null : (
      <Form
        className="bc-form-search-normal"
        type="search"
        gap={12}
        column={column}
        initialValues={userRequest?.defaultParams}
        columns={search.allowRules ? columns : columns.map((item) => ({ ...item, itemProps: null, rules: [] }))}
        onFinish={(values) => request.search(values)}
        actionColumn={({ foldEnable, foldState, setFoldState, actionColumnColSpan }) => {
          return {
            key: '$$search',
            colSpan: actionColumnColSpan,
            style: { alignItems: 'flex-start' },
            element: (
              <ButtonList
                layout="end"
                data={{ foldEnable, foldState, setFoldState }}
                eventMap={{ fold: ({ setFoldState }) => setFoldState((f) => !f) }}
                buttons={[
                  {
                    key: 'fold',
                    hidden: ({ foldEnable }) => !foldEnable,
                    props: ({ foldState }) => ({
                      type: 'link',
                      icon: <DownOutlined rotate={foldState ? 0 : 180} />,
                      children: foldState ? '展开' : '收起',
                    }),
                  },
                  { key: 'reset', group: 'search', props: { htmlType: 'reset', children: '重置' } },
                  { key: 'submit', group: 'search', props: { htmlType: 'submit', type: 'primary', children: '查询' } },
                ]}
              />
            ),
          };
        }}
        {...search.formProps}
        foldConfig={search.foldConfig}
      />
    );

    return {
      head,

      data: { searchVisible, setSearchVisible },

      event: {
        toggleSearch: ({ setSearchVisible }) => setSearchVisible((v) => !v),
      },

      button: {
        key: 'toggleSearch',
        props: ({ searchVisible }) => ({
          title: searchVisible ? '显示查询表单' : '收起查询表单',
          type: searchVisible ? 'primary' : 'dashed',
          icon: <SearchOutlined />,
        }),
        sort: 190,
      },
    };
  },
});
