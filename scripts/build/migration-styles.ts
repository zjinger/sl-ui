/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { mkdirsSync, copySync, outputFileSync } from 'fs-extra';

import path from 'path';

import { buildConfig } from '../build-config';

const sourcePath = buildConfig.publishDir;
const targetPath = path.join(buildConfig.publishDir, `src`);
const lessContent = `@root-entry-name: default;
@import "../style/entry.less";
@import "../components.less;`;

export function copyStylesToSrc(): void {
  mkdirsSync(targetPath);
  copySync(
    path.resolve(sourcePath, `style`),
    path.resolve(targetPath, `style`)
  );
  copySync(
    path.resolve(sourcePath, `sl-ui.css`),
    path.resolve(targetPath, `sl-ui.css`)
  );
  copySync(
    path.resolve(sourcePath, `sl-ui.min.css`),
    path.resolve(targetPath, `sl-ui.min.css`)
  );
  outputFileSync(path.resolve(targetPath, `sl-ui.less`), lessContent);
}
