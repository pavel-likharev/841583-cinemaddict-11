const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
    },
    resolve: {
        alias: {
          src: path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new MomentLocalesPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true,
    }
};