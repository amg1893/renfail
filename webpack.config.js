var Encore = require('@symfony/webpack-encore');
var Dotenv = require('dotenv-webpack');

// require offline-plugin
var OfflinePlugin = require('offline-plugin');
// manifest plugin
var CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addPlugin(new Dotenv())
    .addPlugin(new CopyWebpackPlugin([
        { from: './assets/img', to: 'images' }
    ]))
    .addEntry('app', './assets/js/app.js')

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    .addPlugin(new OfflinePlugin({
        safeToUseOptionalCaches: true,
        caches: {
            main: [
                '**/*.json',
                '**/*.css',
                '**/*.js',
                '**/images/*',
            ],
            additional: [
                '**/fonts/*'
            ],

            optional: [
                ':rest:'
            ]
        },
        ServiceWorker: {
            "events": !Encore.isProduction()
        },
        AppCache: {
            "events": !Encore.isProduction()
        }
    }))
;

module.exports = Encore.getWebpackConfig();
