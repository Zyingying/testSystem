"use strict";
var path = require('path');
var fse = require("fs-extra");
var fs = require("fs");
var webpack = require('webpack');
var IS_NODE_ENV_PRODUCTION = (process.env.NODE_ENV === 'production');
let buildPath =process.env.NODE_ENV == 'local'?'local':(IS_NODE_ENV_PRODUCTION?'release':"development");

fse.ensureDirSync(path.join(__dirname,'build',buildPath));

let webpack_config = {
    entry:{
        main:"./src/router.jsx",
        base:['react','moment','zepto']
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: process.env.NODE_ENV === 'local' ? "[name].bundle.js":"[name]-[chunkhash:6].bundle.js",
        chunkFilename:process.env.NODE_ENV === 'local' ? "[id].bundle.js":"[id]-[chunkhash:6].bundle.js",
        path: path.join(__dirname,'build',buildPath)
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss','.png','.less'],
        alias: {
            react$: __dirname + "/node_modules/react/react.js",
            moment$:__dirname + "/node_modules/moment/min/moment.min.js",
            zepto:__dirname + "/node_modules/webpack-zepto/index.js"
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.css$/,
                loader: 'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url'
            },
            { test: require.resolve(__dirname + "/node_modules/webpack-zepto/index.js"), loader: "expose?$!expose?Zepto" }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('base', process.env.NODE_ENV == 'local' ? 'base.js' : 'base-[chunkhash:6].js'),
        function(){
            this.plugin("done",function(stats){
                if(process.env.NODE_ENV == "local"){
                    return;
                }
                let baseIndexHtmlPath = path.join(__dirname,"html",'local',"index.html");
                let fileDocumentPath = path.join(__dirname,"html",!IS_NODE_ENV_PRODUCTION?"development":"release");
                fse.ensureDirSync(fileDocumentPath);
                fse.emptyDirSync(fileDocumentPath);
                //复制文件
                fse.copySync(path.join(__dirname,'html','local'),fileDocumentPath,{filter:function(filePath){
                    if(path.dirname(filePath).indexOf(fileDocumentPath)>-1){
                        return false;
                    }
                    return true;
                }});

                let assetsChunkName = stats.toJson().assetsByChunkName;
                let baseFileName = assetsChunkName["base"],bundleFileName = assetsChunkName["main"];

                let content = fs.readFileSync(baseIndexHtmlPath,"utf8");
                if(IS_NODE_ENV_PRODUCTION){
                    content = content.replace("http://localhost:8080/base.js","https://mimg.127.net/p/pin_mobile/"+baseFileName)
                        .replace("http://localhost:8080/main.bundle.js","https://mimg.127.net/p/pin_mobile/"+bundleFileName)
                }else if(process.env.NODE_ENV  == 'development'){
                    content = content.replace("http://localhost:8080/base.js","http://mimg.126.net/p/pin_mobile/"+baseFileName[0])
                        .replace("http://localhost:8080/main.bundle.js","http://mimg.126.net/p/pin_mobile/"+bundleFileName[0])
                }
                fs.writeFileSync(path.join(fileDocumentPath,"index.html"),content);
            });
        }
    ]
}
if(!IS_NODE_ENV_PRODUCTION){
    webpack_config["devtool"]=process.env.WEBPACK_DEVTOOL || 'source-map';
    webpack_config["devServer"] = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true
    };
}
module.exports = webpack_config;