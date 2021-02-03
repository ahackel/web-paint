const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/ts/app.ts',
    target: ['web', 'es5'],
    devtool: 'source-map',
    devServer: {
        contentBase: './docs',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
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
            }
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
        new CopyPlugin({
            patterns: [
                { 
                    from: "**/*",
                    context: path.resolve(__dirname, "static")
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
};