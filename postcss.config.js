const webpack = require('webpack');

module.exports = {
    plugins: [
        require('postcss-import')({ addDependencyTo: webpack }),
        require('postcss-url')(),
        require('postcss-cssnext')()
    ]
};

