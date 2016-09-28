"use strict";

const gulp = require("gulp");

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["dist/**/*.*"], ['deploy']).on('change', function (e) {
        console.log('Build updated. File ' + e.path + ' has been changed. Deploying.');
    });
});

/**
 * Deploy all resources to Alpha-Umi target.
 * => ../alpha-umi/target/classes/public
 * This enables live reload.
 */
gulp.task("deploy", () => {
    return gulp.src(["dist/**/*.*"])
        .pipe(gulp.dest("../alpha-umi/target/classes/public"));
});

/**
 * Deploy all resources to Alpha-Umi.
 * => ../alpha-umi/src/main/resources/public
 */
gulp.task("deploy:prod", () => {
    return gulp.src(["dist/**/*.*"])
        .pipe(gulp.dest("../alpha-umi/src/main/resources/public"));
});