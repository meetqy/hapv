module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {}
    }
  },
  chainWebpack: config => {
    config.module
      .rule("image")
      .test(/\.ico$/)
      .use("url-loader")
      .loader("url-loader");
  }
};
