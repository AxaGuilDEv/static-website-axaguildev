import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import fs from 'fs';
import fetch from 'node-fetch';
import { reload } from './serve';
import config from './config';
import modifierFn from '../src/commons/js/modifier';
import fetchJson from '../src/commons/js/fetchJson';
import { apiRepos, apiByType } from '../src/components/github/github';

global.fetch = fetch;

const { pathSrc, pathDest, pugFiles } = config;

const basedir = './';
const baseData = './src/data/';

const getRepos = () => fetchJson(apiRepos);
const getContributors = name => fetchJson(apiByType(name)('contributors'));
const getFileData = fileName => JSON.parse(fs.readFileSync(`${baseData}${fileName}.json`));

const pugTsk = async () => {
  const base = getFileData('base');
  const general = getFileData('general');
  const menu = getFileData('menu');
  const home = getFileData('home');
  const repos = await getRepos();
  const contributorsByRepo = await Promise.all(
    repos.map(async ({ name, id }) => ({
      id,
      users: await getContributors(name),
    })),
  );

  const data = {
    contributorsByRepo,
    repos,
    base,
    general,
    menu,
    home,
    basedir,
    functions: { modifierFn },
  };

  return src(`${pathSrc}${pugFiles}`)
    .pipe(
      pug({
        locals: data,
        // pretty: true,
      }),
    )
    .pipe(dest(pathDest))
    .pipe(reload({ stream: true }));
};

export default pugTsk;
