const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    plugins: [
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 5000,
            minRatio: 0.9
        }),
    ]
}
