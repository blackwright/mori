import Head from 'next/head';
import { Layout } from 'components/layout';
import { Dune } from 'components/pages/dune';

const Page = () => (
  <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
        rel="stylesheet"
      />
    </Head>
    <Layout title="dune">
      <Dune />
    </Layout>
  </>
);

export default Page;
