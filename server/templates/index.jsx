import { renderToString } from 'react-dom/server';
import CV from 'components/CV';

const Template = ({ cssString, ...data }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <link rel="icon" href="https://resume.pango.plus/favicon.ico" />
      <title>{`${data.name.english}'s CV`}</title>
      <meta name="description" content={`${data.name.english}'s CV`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>{`${cssString}`}</style>
    </head>
    <body>
      <CV {...data} />
    </body>
  </html>
);

export default function getHtml(data) {
  return renderToString(<Template {...data} />);
}
