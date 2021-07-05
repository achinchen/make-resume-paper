import Head from 'next/head';
import { Fragment } from 'react';
import { useResume } from 'context';
import CV from 'components/CV';
import Panel from 'components/Panel';

export default function CVPreview() {
  const { name, info, mainContent } = useResume();

  return (
    <Fragment>
      <Head>
        <title>{`${name.english}'s CV`}</title>
        <meta name="description" content={`${name.english}'s CV`} />
      </Head>
      <CV name={name} info={info} mainContent={mainContent} />
      <Panel />
    </Fragment>
  );
}
