const path = require('path');
module.export = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        }, ],
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'postcss-preset-env',
                                {
                                    // Options
                                },
                            ],
                        },
                    },
                },
            ],
        }, ],
    },
    entry: './scripts/app.js', //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js' //输出文件
    },
    mode: 'development' // 设置mode
}