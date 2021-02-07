const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/ts/app.ts',
    devtool: 'source-map',
    devServer: {
        port: 1234,
        host: '0.0.0.0',
        contentBase: './docs',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            '@babel/preset-typescript'
                        ],
                        "plugins": ["transform-class-properties"]
                    }
                }
            },
            {
                test: /\.(sass|scss|css)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    "sass-loader",
                ],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'docs'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
};