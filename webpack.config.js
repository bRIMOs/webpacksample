var webpack = require("webpack");

var path = require("path"); 
var glob = require('glob');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var  PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {

    mode: 'development',
    entry : {
        app:'./src/index.js',
    },
    output: {
        path: path.resolve(__dirname,"./dist"),
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    module : {
        rules: [
            {
                test: /\.s[ac]ss$/,
                //use: ["style-loader",'css-loader','sass-loader']
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    'css-loader','sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins : [
        // new webpack.optimize.UglifyJsPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
        }),

        new webpack.LoaderOptionsPlugin ({
            minimize: true
        })
        
    ]
};

if (process.env.MODE_ENV === 'production') {
    module.exports.plugins.push(

        new webpack.optimize.UglifyJsPlugin(),
        

    );
}