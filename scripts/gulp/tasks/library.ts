/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { dest, parallel, series, src, task } from 'gulp';

import { join } from 'path';

import { compile as compileLess } from '../../build/compile-styles';
import { generateLessVars } from '../../build/generate-less-vars';
import { copyStylesToSrc } from '../../build/migration-styles';
import { buildConfig } from '../../build-config';
import { execTask } from '../util/task-helpers';

/** Run `ng build sl-ui-library` */
task('library:build-sl-ui', execTask('ng', ['build', 'sl-ui-library']));

// Compile less to the public directory.
task('library:compile-less', (done) => {
  compileLess().then(() => {
    copyStylesToSrc();
    done();
  });
});

// Compile less to the public directory.
task('library:generate-less-vars', (done) => {
  generateLessVars();
  done();
});

// Copies README.md file to the public directory.
task('library:copy-resources', () => {
  return src([
    join(buildConfig.projectDir, 'README.md'),
    join(buildConfig.componentsDir),
  ]).pipe(dest(join(buildConfig.publishDir)));
});

// Copies files without ngcc to lib folder.
task('library:copy-libs', () => {
  return src([join(buildConfig.publishDir, '**/*')]).pipe(
    dest(join(buildConfig.libDir))
  );
});

task(
  'build:library',
  series(
    'library:build-sl-ui',
    parallel('library:compile-less', 'library:copy-resources'),
    'library:copy-libs'
  )
);
