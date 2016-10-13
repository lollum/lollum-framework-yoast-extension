'use strict';

var gulp         = require('gulp');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var del          = require('del');
var zip          = require('gulp-zip');
var runSequence  = require('run-sequence');

var dirs = {
	js: ['assets/js/**/*.js', '!assets/js/**/*.min.js'],
	php: ['lollum-page-builder-yoast-extension.php'],
}

var build_files = [
	'**',
	'!node_modules',
	'!node_modules/**',
	'!dist',
	'!dist/**',
	'!.git',
	'!.git/**',
	'!package.json',
	'!.gitignore',
	'!gulpfile.js',
	'!README.md',
	'!.editorconfig',
	'!.jshintrc'
];

gulp.task('lint', function() {
	return gulp.src(dirs.js)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('compress', function() {
	return gulp.src(dirs.js, {base: '.'})
		.pipe(gulp.dest('.'))
		.pipe(uglify())
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
	gulp.watch(dirs.js, ['lint']);
	gulp.watch(dirs.js, ['compress']);
});

gulp.task('build-clean', function() {
	del(['dist/**/*']);
});

gulp.task('build-copy', function() {
	return gulp.src(build_files)
		.pipe(gulp.dest('dist/lollum-page-builder-yoast-extension'));
});

gulp.task('build-zip', function() {
	return gulp.src('dist/**/*')
		.pipe(zip('lollum-page-builder-yoast-extension.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build-delete', function() {
	del(['dist/**/*', '!dist/lollum-page-builder-yoast-extension.zip']);
});

gulp.task('build', function(callback) {
	runSequence('build-clean', 'build-copy', 'build-zip', 'build-delete');
});

gulp.task('default', ['lint', 'compress', 'watch']);
