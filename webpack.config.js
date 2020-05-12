// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//     chunkFilename: '[id].js',
//     publicPath: ''
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         use: [
//           { loader: 'style-loader' },
//           {
//             loader: 'css-loader',
//             options: {
//               modules: {
//                 localIdentName: '[name]__[local]___[hash:base64:5]',
//               },
//               sourceMap: true
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//       filename: 'index.html',
//       inject: 'body'
//     })
//   ]
// };
