import { readFileSync } from 'fs-extra';
import lessToJs from 'less-vars-to-js';

import path from 'path';

import { buildConfig } from '../build-config';

const stylePath = path.join(buildConfig.componentsDir, 'style');
const colorLess = readFileSync(path.join(stylePath, 'color', 'colors.less'), 'utf8');
const defaultLess = readFileSync(path.join(stylePath, 'themes', 'default.less'), 'utf8');
const darkLess = readFileSync(path.join(stylePath, 'themes', 'dark.less'), 'utf8');

export const darkPaletteLess = lessToJs(`${colorLess}${defaultLess}${darkLess}`, {
  stripPrefix: true,
  resolveVariables: false
});
