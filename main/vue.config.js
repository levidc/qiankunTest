const path = require('path');

module.exports = {
  transpileDependencies: ['single-spa', 'qiankun', 'import-html-entry'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      }
    },
  },
  devServer: {
    port: 2223,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api/': {
        target: 'http://10.0.2.191:8310/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 路径根据具体需求更改
        path.resolve(__dirname, 'src/assets/css/variables.scss')
      ]
    }
  }
};

