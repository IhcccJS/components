function requestPlugin({ TYPE }) {
  return {
    key: 'requestLoadMore',

    type: TYPE.METHOD,

    // 获取到请求实例方法

    // 返回一组方法，在其它组件和插件中调用
    methods: {
      // 合并到当前参数，pageNumber 修改为 1，然后执行请求
      search: (params) => {
        // paramState = { ...paramState, ...params, pageNumber: 1 };
        // query(paramState)
      },

      // 刷新，pageNumber 修改为 1，然后执行请求
      refresh: () => {
        // paramState = { ...paramState, pageNumber: 1 };
        // query(paramState)
      },

      // 加载更多，页码加 1，然后执行请求
      loadMore: () => {
        // paramState = { ...paramState, pageNumber: paramState.page + 1 };
        // query(paramState)
      },
    },
  };
}

export default requestPlugin;
