import fs from 'fs/promises';

const filerCss = (files) => files.filter((file) => file.includes('css'));
const getCssFilePaths = async () => {
  const json = await fs.readFile('./.next/build-manifest.json', 'utf-8');
  const { pages } = JSON.parse(json);
  const app = filerCss(pages['/_app']);
  const cv = filerCss(pages['/cv']);
  return [...app, ...cv];
};

export const getCssString = async () => {
  try {
    const cssFilePaths = await getCssFilePaths();
    let cssString = '';

    for (let cssFilePath of cssFilePaths) {
      const currentCssString = await fs.readFile(
        `./.next/${cssFilePath}`,
        'utf8'
      );
      cssString += currentCssString;
    }
    return cssString;
  } catch (e) {
    console.error(e);
  }
};

getCssString();
