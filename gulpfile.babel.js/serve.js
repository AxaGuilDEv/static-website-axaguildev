import { watch, series } from 'gulp';
import { create } from 'browser-sync';
let browserSync = create();
export const reload = browserSync.reload;
import sass from './sass';
import js from './js';
import pug from './pug';
import sprite from './sprite';

import config from './config';
const {
  pathDest,
  pathSrc,
  sassFiles,
  jsFiles,
  pugWatchFiles,
  jsonFiles,
  svgFiles,
  pathSvg,
} = config;

const serve = () => {
  browserSync.init({
    port: 5001,
    server: {
      watch: true,
      baseDir: pathDest,
    },
  });

  watch([`${pathSrc}${sassFiles}`], series(sass));
  watch([`${pathSrc}${jsFiles}`], series(js));
  watch([`${pathSrc}${pugWatchFiles}`, `${pathSrc}${jsonFiles}`], series(pug));
  watch([`${pathSrc}${pathSvg}${svgFiles}`], series(sprite));
};

export default serve;
