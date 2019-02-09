var webpack = require("webpack");

var path = require("path"); 
var glob = require('glob');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var  PurifyCSSPlugin = require('purifycss-webpack');
var  HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    mode: 'production',
    entry : {
        app:'./src/index.js',
    },
    output: {
        path: path.resolve(__dirname,"./dist"),
        filename: '[name].bundle.js',
        //publicPath: ''
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
                            //publicPath: '../'
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
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: 'public',
                        
                    },
                  },
                ],
            },
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
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: path.join(__dirname, 'index.html')
        })
        
    ]
};

if (process.env.MODE_ENV === 'production') {
    module.exports.plugins.push(

        new webpack.optimize.UglifyJsPlugin(),
        

    );
}