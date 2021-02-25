const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack needs to be explicitly required
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: './src/ts/app.ts',
    devtool: 'source-map',
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
        fallback: {
            util: require.resolve("util/"),
            "crypto": false,
        }
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'docs'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        nodeEnv: 'production'
    },
    plugins: [
        // fix "process is not defined" error:
        // (do "npm install process" before running the build)
        // https://github.com/browserify/node-util/issues/43
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
};