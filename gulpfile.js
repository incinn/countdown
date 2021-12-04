require('dotenv').config();
const _PROD = process.env.MODE === 'prod' ? true : false;

const { src, dest, watch, series, parallel } = require('gulp');
const Dotenv = require('dotenv-webpack');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const outputLocation = './dist';
const sassLocation = './src/css/main.scss';
const htmlLocation = './src/html/index.html';
const assetLocation = './src/assets/**/*.*';
const tsLocation = './src/js/**/*.ts';

function cleanup() {
    return del([outputLocation + '/**/*']);
}

function cleanInstall() {
    return new Promise((res, rej) => {
        if (_PROD) del('./node_modules/**/*');
        res();
    });
}

function compileSass() {
    return src(sassLocation)
        .pipe(gulpif(!_PROD, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(cleanCSS())
        .pipe(gulpif(!_PROD, sourcemaps.write('.')))
        .pipe(dest(outputLocation));
}

function compileTs() {
    return src(tsLocation)
        .pipe(
            webpackStream({
                mode: _PROD ? 'production' : 'development',
                devtool: _PROD ? undefined : 'source-map',
                entry: './src/js/main.ts',
                module: {
                    rules: [
                        {
                            test: /\.tsx?$/,
                            use: 'ts-loader',
                            exclude: /node_modules/,
                        },
                    ],
                },
                plugins: [
                    new Dotenv({
                        path: './.env',
                    }),
                    new webpack.DefinePlugin({
                        __VERSION: JSON.stringify(
                            require('./package.json').version
                        ),
                    }),
                ],
                resolve: {
                    extensions: ['.tsx', '.ts', '.js'],
                },
                output: {
                    filename: 'bundle.js',
                },
            })
        )
        .pipe(dest(outputLocation));
}

function buildHtml() {
    return src(htmlLocation).pipe(dest(outputLocation));
}

function copyAssets() {
    return src(assetLocation).pipe(dest(outputLocation));
}

function watchSource() {
    watch('./src/css/**/*.scss', compileSass);
    watch('./src/js/**/*.ts', compileTs);
    watch(htmlLocation, buildHtml);
}

exports.build = series(
    cleanup,
    parallel(copyAssets, compileSass, compileTs),
    buildHtml,
    cleanInstall
);
exports.watch = series(
    cleanup,
    copyAssets,
    compileSass,
    compileTs,
    buildHtml,
    watchSource
);
exports.clean = cleanup;
