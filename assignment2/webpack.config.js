const path = require("path")

const htmlWebpackPlugin = require("html-webpack-plugin")
const miniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: path.join(__dirname, "src/js/index.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    watch: true, 
    module: {
        rules: [
            {
                 test: [/.css$|.scss$/],
                //  test: [/(?<!\.style).css$|(?<!\.style).scss$/],
                 use: [
                     //pakuje cssy do bundle.js
                    //  'style-loader',
 
                     //tego uzyc jakbym chcial miec w discie main.css
                     miniCssExtractPlugin.loader,
                     'css-loader',
                     'sass-loader'
                 ],
            },
            // {
            //     // bierze tak samo cssy ale nie pakuje ich do headera tylko je importuje
            //     test: [/\.style.css$|\.style.scss$/],
            //     use: [       
            //         // 'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },

            //bierze cssa i exportuje go do obiektu tekstowego

            // {
            //     test: [/.css$/],
            //     use: [
            //         'raw-loader'
            //     ]
            // }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "src/index.html",
            inject: true,
            filename: "index.html"
        }),

        //tworzy plik main.hash.css w discie:

        new miniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8000,
    }

}



