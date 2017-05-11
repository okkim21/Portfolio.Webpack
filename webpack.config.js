var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');
var glob = require('glob');
// var PurifyCSSPlugin = require('purifycss-webpack');

var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader', 'css-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader"
})

var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/app.js',
        bootstrap: bootstrapConfig,
        scroll: './src/app/scroll/scroll.js',
        responsive: './src/app/responsive/responsive.js',
        video: './src/app/video/video.js',
        pin: './src/app/pin/pin.js',
        reveal: './src/app/reveal/reveal.js',
        crossfade: './src/app/crossfade/crossfade.js',
        game: './src/app/game/game.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:12].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssConfig
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    "url-loader?name=images/[name].[hash:12].[ext]&limit=10000"
                ]
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
            { test: /\.(mp4|webm|ogv)$/, loader: 'url-loader?name=images/[name].[ext]' }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Portfolio',
            hash: true,
            excludeChunks: ['scroll', 'responsive', 'video', 'pin','reveal','crossfade','game'],
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Scroll',
            hash: true,
            excludeChunks: ['app', 'responsive', 'video', 'pin','reveal','crossfade','game'],
            filename: 'scroll.html',
            template: './src/app/scroll/scroll.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Responsive',
            hash: true,
            excludeChunks: ['app', 'scroll', 'video', 'pin','reveal','crossfade','game'],
            filename: 'responsive.html',
            template: './src/app/responsive/responsive.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Video',
            hash: true,
            excludeChunks: ['app', 'scroll', 'responsive', 'pin','reveal','crossfade','game'],
            filename: 'video.html',
            template: './src/app/video/video.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Pin',
            hash: true,
            excludeChunks: ['app', 'scroll', 'responsive', 'video','reveal','crossfade','game'],
            filename: 'pin.html',
            template: './src/app/pin/pin.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Reveal',
            hash: true,
            excludeChunks: ['app', 'scroll', 'responsive', 'video','pin','crossfade','game'],
            filename: 'reveal.html',
            template: './src/app/reveal/reveal.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Cross-fade',
            hash: true,
            excludeChunks: ['app', 'scroll', 'responsive', 'video','pin','reveal','game'],
            filename: 'crossfade.html',
            template: './src/app/crossfade/crossfade.html'
        }),
         new HtmlWebpackPlugin({
            title: 'Game',
            hash: true,
            excludeChunks: ['app', 'scroll', 'responsive', 'video','pin','reveal','crossfade'],
            filename: 'game.html',
            template: './src/app/game/game.html'
        }),
        new ExtractTextPlugin({
            filename: '/css/[name].[hash:12].css',
            disable: false,
            allChunks: true
        }),
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, 'src/*.html')),
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}