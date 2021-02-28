'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
      sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const minifier = require('gulp-minifier');
//const rename = require('gulp-rename');


const browserSync = require('browser-sync').create();
const del = require('del');

let environment = '';
let isDev = false;

const coreDir = {
    source: 'source',
    development: 'dev',
    production: 'prod',
};

const paths = {
    markup: {
        src: ['/pages/*.pug'],
        dst: '',
        watch: '/pages/**/*.pug'
    },
    style: {
        src: '/assets/style/*.scss',
        dst: '/assets/css/',
        watch: '/assets/style/**/*.scss'
    },
    script: {
        src: '/assets/js/**/*.js',
        exclude: '!node_modules/**',
        dst: '/assets/js/',
        watch: '/assets/js/**/*.js'
    },
    font: {
        src: '/assets/fonts/**/*.*',
        dst: '/assets/fonts/',
        watch: '/assets/fonts/**/*.*'
    },
    picture: {
        src: '/assets/img/**/*.*',
        dst: '/assets/img/',
        watch: '/assets/img/**/*.*'
    },
    data: {
        src: '/data/**/*.*',
        dst: '/assets/data/',
        watch: '/data/**/*.*'
    },
	favicon: {
        src: '/assets/favicon/**/*.*',
        dst: '/assets/favicon/',
        watch: '/assets/favicon/**/*.*'
    },
	vendor: {
        src: '/assets/vendor/**/*.*',
        dst: '/assets/vendor/',
        watch: '/assets/vendor/**/*.*'
    },
    serve: {
        server: coreDir.development,
        watch: coreDir.development + '/**/*.*'
    }
};

/** TASKS **/

// Markup
gulp.task('markup', () => {
    let processors = {
        pretty: true
    };

    return gulp.src(coreDir.source + paths.markup.src)

        .pipe(pug(processors))
        .on('error', notify.onError(function (error) {
            return {
                title: 'Markup',
                message: error.message
            };
        }))

        .pipe(gulp.dest(environment + paths.markup.dst));
});

// Style
gulp.task('style', () => {
    let processors = {
        cascade: false
    };

    let minifierOptions = {
        minify: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: false,
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            let m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    };

    return gulp.src(coreDir.source + paths.style.src, { sourcemaps: isDev })

        .pipe(sass({outputStyle: isDev ? 'expanded' : 'compressed'}))
        .on('error', notify.onError(function (error) {
            return {
                title: 'Style',
                message: error.message
            };
        }))
        .pipe(autoprefixer(processors))


        .pipe(gulpIf(!isDev, minifier(minifierOptions)))

        .pipe(gulp.dest(environment + paths.style.dst, { sourcemaps: './' }));
});

// Script
gulp.task('script', () => {
    return gulp.src(coreDir.source + paths.script.src, coreDir.source + paths.script.exclude, { sourcemaps: isDev })

        // TO DO

        .pipe(gulp.dest(environment + paths.script.dst, { sourcemaps: './' }));
});

// Font
gulp.task('font', () => {
    return gulp.src(coreDir.source + paths.font.src)
        .pipe(gulp.dest(environment + paths.font.dst));
});

// Favicon
gulp.task('favicon', () => {
    return gulp.src(coreDir.source + paths.favicon.src)
        .pipe(gulp.dest(environment + paths.favicon.dst));
});

// Vendor
gulp.task('vendor', () => {
    return gulp.src(coreDir.source + paths.vendor.src)
        .pipe(gulp.dest(environment + paths.vendor.dst));
});


// Picture
gulp.task('picture', () => {
    return gulp.src(coreDir.source + paths.picture.src)
        .pipe(gulpIf(!isDev, imagemin({
            optimizationLevel: 4, //7
        })))
        /*.pipe(gulp.dest((file) => {
            file.base = file.dirname;

            return environment + paths.picture.dst;
        }));*/
        .pipe(gulp.dest(environment + paths.picture.dst));
});

// Data
gulp.task('data', () => {
    return gulp.src(coreDir.source + paths.data.src)
        .pipe(gulp.dest(environment + paths.data.dst));
});

// Clean
gulp.task('clean', () => {
    return del(environment);
});

// Init:dev
gulp.task('init:dev', (callback) => {
    environment = coreDir.development;
    isDev = true;
    callback();
});

// Init:prod
gulp.task('init:prod', (callback) => {
    environment = coreDir.production;
    isDev = false;
    callback();
});

gulp.task('init', (callback)=>{
    console.log('isDev: ' + isDev);
    callback();
});

// Serve
gulp.task('serve', () => {
    browserSync.init({server: paths.serve.server});
    browserSync.watch(paths.serve.watch).on('change', browserSync.reload);
});

// Watch
gulp.task('watch', () => {
    gulp.watch(coreDir.source + paths.style.watch, gulp.series('style'));
    gulp.watch(coreDir.source + paths.markup.watch, gulp.series('markup'));
    gulp.watch(coreDir.source + paths.script.watch, gulp.series('script'));
    gulp.watch(coreDir.source + paths.picture.watch, gulp.series('picture'));
    gulp.watch(coreDir.source + paths.data.watch, gulp.series('data'));
    gulp.watch(coreDir.source + paths.font.watch, gulp.series('font'));
	gulp.watch(coreDir.source + paths.favicon.watch, gulp.series('favicon'));
	gulp.watch(coreDir.source + paths.vendor.watch, gulp.series('vendor'));
});

// Start
gulp.task('start',
    gulp.series(
        'init:dev',
        'clean',
        gulp.parallel('style', 'markup', 'script'),
        gulp.parallel('font', 'data', 'picture', 'favicon', 'vendor'),
        gulp.parallel('watch', 'serve')
    )
);

// Build
gulp.task('build',
    gulp.series(
        'init:prod',
        'clean',
        gulp.parallel('style', 'markup', 'script'),
        gulp.parallel('font', 'data', 'picture', 'favicon', 'vendor')
    )
);
