exports.getPluginConfig = function() {
    return {
        transforms: [
            require('./my-transform')
        ]
    };
};

exports.createDependency = function(dirname) {
    return {
        from: dirname,
        path: './bar'
    };
};