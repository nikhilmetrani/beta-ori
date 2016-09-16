/**
* Copyright 2016 - 29cu.io and the authors of alpha-umi open source project

* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at

*     http://www.apache.org/licenses/LICENSE-2.0

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
var uglify = require('gulp-uglify');
var pump = require('pump');

/**
 * Remove build directory.
 */
gulp.task('clean', ["clean_int"], (cb) => {
    return del(["build"], cb);
});

gulp.task('clean_int', (cb) => {
    return del(["int"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript sources and create sourcemaps in int directory.
 */
gulp.task("compile", ["tslint", "copy_systemjs"], () => {
    console.log('Compiling TypeScript to javascript...');
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("int/js"));
});

/**
 * Copy systemjs.config.js into int/js directory.
 */
gulp.task("copy_systemjs", () => {
    return gulp.src(["src/systemjs.config.js"])
        .pipe(gulp.dest("int/js"));
});

/**
 * Uglify javascript files to build/js directory.
 */
gulp.task('uglify', ["uglify_systemjs", "uglify_app"], () => {
  console.log('uglifying javascript files...');
});

/**
 * Uglify systemjs to build/js directory.
 */
gulp.task('uglify_systemjs', ["copy_systemjs"], function (cbs) {
  pump([
        gulp.src('int/js/*.js'),
        uglify({
                output: {
                    comments: 'saveLicense'
                }
            }),
        gulp.dest('build/js')
    ],
    cbs
  );
});

/**
 * Uglify app files to build/js directory.
 */
gulp.task('uglify_app', ["compile"], function (cba) {
  pump([
        gulp.src('int/js/app/**/*.js'),
        uglify({
                output: {
                    comments: 'saveLicense'
                }
            }),
        gulp.dest('build/js/app')
    ],
    cba
  );
});

/**
 * Copy all source maps into build directory.
 */
gulp.task("copy_sourcemaps", ["compile"], () => {
    return gulp.src(["int/js/app/**/*.js.map"])
        .pipe(gulp.dest("build/js/app"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts", "!**/*systemjs.config.js"])
        .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'bootstrap/dist/**',
            'jquery/dist/jquery.min.js'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/js/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile', 'uglify']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(["src/systemjs.config.js"], ['copy_systemjs']).on('change', function (e) {
        console.log('System JS file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(["build/**/*.*"], ['deploy']).on('change', function (e) {
        console.log('Build updated. File ' + e.path + ' has been changed. Deploying.');
    });
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'copy_sourcemaps', 'uglify', 'resources', 'libs'], () => {
    console.log("Building the project ...");
});

/**
 * Deploy all resources to Alpha-Umi.
 * => ../alpha-umi/src/main/resources/public
 */
gulp.task("deploy", () => {
    return gulp.src(["build/**/*.*"])
        .pipe(gulp.dest("../alpha-umi/src/main/resources/public"));
});
