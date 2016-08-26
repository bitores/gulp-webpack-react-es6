var webpack = require("webpack");
const glob = require('glob');
var config = {
    // 生产环境 'devtool: false'
    devtool:'devtool: false',//'inline-source-map',
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/dist/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx|js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }],
        preLoaders:[{
            test: /\.js$/, 
            loader: "eslint-loader", 
            exclude: /node_modules/
        }],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    eslint: {
        configFile: './.eslintrc'
    }
};
/**
 * find entries
 */
var files = glob.sync('./dev/js/*/index.jsx');
var newEntries = files.reduce(function(memo, file) {
    var name = /.*\/(.*?)\/index\.js/.exec(file)[1];
    memo[name] = entry(name);
    return memo;
}, {});
config.entry = Object.assign({}, config.entry, newEntries);
/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function entry(name) {
    return './dev/js/' + name + '/index.jsx';
}
module.exports = config;