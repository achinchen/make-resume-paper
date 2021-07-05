import { getCssString } from 'server/templates/helpers';
import getHtml from 'server/templates/index';

let cssString = '';

export default async function handler(req, res) {
  if (!req.body) return res.status(400).end(`Without Resume Data Not Allow`);
  if (!cssString) cssString = await getCssString();
  const app = getHtml({ cssString, ...req.body });

  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.send(app);
}
