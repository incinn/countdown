import gulp from 'gulp';
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

function compileSass() {
  return gulp
    .src(sassLocation)
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest(outputLocation));
}

function buildTs() {
  return gulp
    .src(tsLocation)
    .pipe(
      webpackStream({
        mode: 'production',
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

function devBuildTs() {
  return gulp
    .src(tsLocation)
    .pipe(
      webpackStream({
        mode: 'development',
        devtool: 'source-map',
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
          new webpack.DefinePlugin({
            __VERSION: 'devbuild',
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
  gulp.watch('./src/js/**/*.ts', devBuildTs);
  gulp.watch(htmlLocation, buildHtml);
}

export const build = gulp.series(
  cleanup,
  gulp.parallel(copyAssets, compileSass, buildTs),
  buildHtml
);

export const watch = gulp.series(
  cleanup,
  copyAssets,
  compileSass,
  devBuildTs,
  buildHtml,
  watchSource
);
