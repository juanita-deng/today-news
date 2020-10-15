const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    port: 8888,
    open: true,
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
