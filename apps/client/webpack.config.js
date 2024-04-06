const { NxWebpackPlugin } = require('@nx/webpack')
const { NxReactWebpackPlugin } = require('@nx/react')
const { join } = require('path')
const { name } = require('../../package.json')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/client'),
  },
  devServer: {
    port: 3000,
    liveReload: process.env.NODE_ENV === 'development',
    open: [`/${name}`],
    historyApiFallback: true,
  },
  plugins: [
    new NxWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main.tsx',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.scss'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
      skipTypeChecking: true,
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
  ],
}
