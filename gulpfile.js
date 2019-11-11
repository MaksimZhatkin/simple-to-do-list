'use strict';

const gulp				= require('gulp'),
			sass				= require('gulp-sass'),
			babel				= require('gulp-babel'),
			cleanCss		= require('gulp-clean-css'),
			browserSync = require('browser-sync').create();

function style() {
	return gulp.src('./app/src/styles/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCss())
		.pipe(gulp.dest('./app/assets/css'))
		.pipe(browserSync.stream());
}

function scripts() {
	return gulp.src('./app/src/scripts/**/*.js')
		.pipe(gulp.dest('./app/assets/js'))
		.pipe(browserSync.stream());
}

function vectors(){
	return gulp.src('./app/src/vectors/*')
	.pipe(gulp.dest('./app/assets/svg'))
	.pipe(browserSync.stream()); 
}

function images(){
	return gulp.src('./app/src/images/**/*')
	.pipe(gulp.dest('./app/assets/img'))
	.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './app',
		},
	});

	gulp.watch('./app/src/styles/**/*.scss', style);
	gulp.watch('./app/src/scripts/**/*.js', scripts);
	gulp.watch('./app/src/images/**/*', images);
	gulp.watch('./app/src/vectors/**/*', vectors);
	gulp.watch('./app/index.html').on('change', browserSync.reload);
}

exports.style = style;
exports.scripts = scripts;
exports.images = images;
exports.vectors = vectors;
exports.w = watch;