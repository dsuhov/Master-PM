"use strict";

global.$ = {
    path: {
        task: require('./gulp/path/tasks.js')
    },
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    del: require('del')
};

$.gulp.task('copyCss', function() {
    return $.gulp.src('./dev/static/styles/*.css')
        .pipe($.gulp.dest('./build/static/css/'));
});

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'styles:dev',
        'img:dev',
        'libsJS:dev',
        'js:dev',
        'svg',
        'copyCss'
    )
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'styles:build',
        'img:build',
        'libsJS:build',
        'js:build',
        'svg',
        'copyCss'
    )
));


$.gulp.task('build-min', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'styles:build-min',
        'img:build',
        'libsJS:build',
        'js:build-min',
        'svg'
    )
));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
