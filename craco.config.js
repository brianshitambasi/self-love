// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress the critical dependency warning from react-datepicker
      webpackConfig.module = {
        ...webpackConfig.module,
        exprContextCritical: false,
      };
      return webpackConfig;
    },
  },
};