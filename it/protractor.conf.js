let baseUrl = 'http://localhost:3000';

exports.config = {
    specs: ['*.js'],

    capabilities:
        {
            browserName: 'chrome'
        },

    baseUrl,

    framework: 'jasmine2',

    logLevel: 'DEBUG'

};
