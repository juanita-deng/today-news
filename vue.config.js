const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    port: 8888,
    open: true,
    //配置反向代理(跨域问题)
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //代理路径
        pathRewrite: { '^/api': '' }, //路径重写
        secure: true, //匹配https也能通过访问
        changeOrigin: true, //修改请求头host信息
      },
    },
  },
  //路径@配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
      .set('public', resolve('public'))
      .set('views', resolve('src/views'));
  },
};
