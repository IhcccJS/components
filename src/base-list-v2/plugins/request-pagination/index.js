function requestPlugin({ TYPE }) {
  // 获取到请求实例方法

  return {
    key: 'requestPagination',

    type: TYPE.METHOD,

    // 返回一组方法，在其它组件和插件中调用
    methods: {
      // 合并到当前参数，pageNumber 修改为 1，然后执行请求
      search: (params) => {
        // paramState = { ...paramState, ...params, pageNumber: 1 };
        // query(paramState)
      },

      // 刷新，pageNumber 修改为 1，然后执行请求
      refresh: () => {
        console.log('refresh');
        // paramState = { ...paramState, pageNumber: 1 };
        // query(paramState)
      },

      // 翻页，修改翻页参数，然后执行请求
      page: (page, size) => {
        // paramState = { ...paramState, pageNumber: page, pageSize: size };
        // query(paramState)
      },
    },

    callback: {
      onMounted: () => {},
      onUnmounted: () => {},
    },
  };
}

export default requestPlugin;
