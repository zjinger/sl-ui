import { task } from 'gulp';

import { execTask } from '../util/task-helpers';
/** Run `ng serve` */
task('serve:site', (done) => {
  //   const port = await detect(4200);
  execTask('ng', [
    'serve',
    'demo',
    '--configuration=dev',
    // '--port',
    // port === 4200 ? '4200' : '0',
  ])(done);
});
