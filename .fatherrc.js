import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'es', ignores: ['src/**/demo/**/*'] },
  // cjs: { output: 'lib', ignores: ['src/**/demo/**/*'] },
  umd: { entry: 'src/style/index.js', name: 'ihc', output: 'dist' },
});
