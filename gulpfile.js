import dotenv from 'dotenv';
dotenv.config();
const _PROD = process.env.MODE === 'prod' ? true : false;

import gulp from 'gulp';
import Dotenv from 'dotenv-webpack';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import gulpSass from 'gulp-sass';
import sassPackage from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import { deleteAsync } from 'del';
import replace from 'gulp-replace';
import fs from 'fs';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import packageJson from './package.json' assert { type: 'json' };

const sass = gulpSass(sassPackage);
const appVersion = packageJson.version;

const outputLocation = './dist';
const sassLocation = './src/css/main.scss';
const htmlLocation = './src/html/index.html';
const assetLocation = './src/assets/**/*.*';
const tsLocation = './src/js/**/*.ts';

function cleanup() {
  return deleteAsync([outputLocation + '/**/*']);
}

function purgeNodeModules() {
  return new Promise((res) => {
    if (_PROD) del('./node_modules/**/*');
    res();
  });
}

function compileSass() {
  return gulp
    .src(sassLocation)
    .pipe(gulpif(!_PROD, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS())
    .pipe(gulpif(!_PROD, sourcemaps.write('.')))
    .pipe(gulp.dest(outputLocation));
}

function compileTs() {
  return gulp
    .src(tsLocation)
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
            __VERSION: JSON.stringify(appVersion),
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
    .pipe(gulp.dest(outputLocation));
}

function buildHtml() {
  return gulp
    .src(htmlLocation)
    .pipe(
      replace('%STYLESHEET%', () => {
        const stylesheet = fs.readFileSync(
          outputLocation + '/main.css',
          'utf8'
        );
        return `<style type="text/css">\n${stylesheet}</style>`;
      })
    )
    .pipe(gulp.dest(outputLocation));
}

function copyAssets() {
  return gulp.src(assetLocation).pipe(gulp.dest(outputLocation));
}

function watchSource() {
  gulp.watch('./src/css/**/*.scss', gulp.series(compileSass, buildHtml));
  gulp.watch('./src/js/**/*.ts', compileTs);
  gulp.watch(htmlLocation, buildHtml);
}

export const build = gulp.series(
  cleanup,
  gulp.parallel(copyAssets, compileSass, compileTs),
  buildHtml
);

export const watch = gulp.series(
  cleanup,
  copyAssets,
  compileSass,
  compileTs,
  buildHtml,
  watchSource
);

export const clean = purgeNodeModules;
