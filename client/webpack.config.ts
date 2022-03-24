/* eslint-disable import/no-anonymous-default-export */
const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default  {
  target: 'node',
  context: __dirname,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    fallback: { 
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "path": require.resolve("path-browserify"),
        "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
      } 
    },
    alias: {
      page: path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component'),
      style: path.resovle(__dirname, 'src/style'),
      asset: path.resovle(__dirname, 'src/asset'),
     
    },
    
    extensions: ['.js', '.jsx'],
  },
};
