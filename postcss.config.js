module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 2 versions', '> 50%', 'IE > 10']
        }),
        require("postcss-import")({ addDependencyTo: webpack }),
        require("postcss-url")(),
        require("postcss-cssnext")()
    ]
};