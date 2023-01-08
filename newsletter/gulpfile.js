import gulp from 'gulp';
import gulpCopy from 'gulp-copy';
import inlineCss from 'gulp-inline-css';

export const copy = () => gulp
  .src(['src/assets/*', 'src/templates/*'])
  .pipe(gulpCopy('dist', { prefix: 1 }));

export const inlineEmail = () => (
  gulp.src('dist/templates/mail.njk')
    .pipe(inlineCss())
    .pipe(gulp.dest('dist/templates'))
);

export default gulp.series(copy, inlineEmail);