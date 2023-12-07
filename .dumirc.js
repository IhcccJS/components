import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'dist-components',
  hash: true,
  base: '/', // 根路径
  publicPath: '/', // 静态文件路径
  favicons: [],
  styles: [
    'div.site-features { max-width: 1152px; }',
    'section.dumi-default-header-left{ width: 320px; }',
  ],
  themeConfig: {
    // github: "https://github.com/IhcccJS/components",
    name: '@ihccc/components',
    title: '@ihccc/components',
    logo: '',
    hero: {
      description: '🎯 面向业务开发的强化版组件库',
      actions: [{ type: 'primary', text: '开始使用', link: '/guide' }],
      features: [
        {
          title: '开箱即用',
          description: '接入简单，安装即使用，全面融入 Ant Design 5.0 风格。',
        },
        {
          title: '面向业务',
          description:
            '本库组件在业务开发时经常使用的组件，使复杂的业务简单快捷实现是 @ihccc/components 的目标',
        },
        {
          title: '功能强大',
          description:
            '复杂的问题简单化，重复的代码精炼化，只需要简单的引入和搭配，即可实现复杂的功能',
        },
        {
          title: '简单上手',
          description: '完整的文档，属性、类型、默认值一目了然',
        },
        {
          title: '不断完善',
          description: '还在不断的升级和改进，希望能达成更加统一规范',
        },
        { title: '基于Antd', description: '组件库目前完全基于 Antd' },
      ],
    },
    footerConfig: { columns: [], bottom: 'Powered by dumi' },
    // demo: { lazyLoading: true },
    siteToken: { contentMaxWidth: 2000 },
  },
});
