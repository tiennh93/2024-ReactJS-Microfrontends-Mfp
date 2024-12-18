const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const marketingDomain = process.env.PRODUCTION_MARKETING_DOMAIN; // config in Github
const authDomain = process.env.PRODUCTION_AUTH_DOMAIN;
const dashboardDomain = process.env.PRODUCTION_DASHBOARD_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${marketingDomain}/remoteEntry.js`,
        auth: `auth@${authDomain}/remoteEntry.js`,
        dashboard: `dashboard@${dashboardDomain}/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
