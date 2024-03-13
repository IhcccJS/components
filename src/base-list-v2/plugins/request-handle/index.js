// 提供请求处理
function requestHandlePlugin({ TYPE, ee }) {
  return {
    key: 'requestHandlePlugin',

    type: TYPE.METHOD,

    props: [
      { key: 'services', value: [], omit: true },
      { key: 'defaultParams', value: {}, omit: true },
      { key: 'defaultParams', value: {}, omit: true },
    ],

    // 获取到请求实例方法

    // 返回一组方法，在其它组件和插件中调用
    listener: {
      onMounted: () => {},
    },
  };
}

export default requestHandlePlugin;
