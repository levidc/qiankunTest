const path = require('path');

module.exports = {
  transpileDependencies: ['single-spa', 'qiankun', 'import-html-entry'],
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [
  //       // 路径根据具体需求更改
  //       path.resolve(__dirname, 'src/assets/css/variables.scss')
  //     ]
  //   }
  // }
};

