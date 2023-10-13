var path = require('path');
var HTMLWebpackplugin = require('html-webpack-plugin');
var HTMLWebpackpluginConfig = new HTMLWebpackplugin({
    template:__dirname+'/src/index.html',
    filename:'index1.html'
});

module.exports = {
    mode: 'development',
    entry:__dirname + '/src/index.js',
    devServer: {
        open: true,
        hot: true,
        static: __dirname + '/dist',
        historyApiFallback: {
            index: 'index1.html'
         }
    },
    module:{
        rules:[
            
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
              },
            { test: /\.css$/, 
                exclude:/node_modules/,
                use: ['style-loader','css-loader']},
            
                {
                    test: /\.svg/,
                    use: {
                        loader: 'svg-url-loader'
                    }
                  }
            
        ]
    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/dist'
    },
    plugins:[HTMLWebpackpluginConfig],
    performance :  {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};