import React from 'react';
import Layout from ' @/components/Layout';
import Head from 'next/head';
import Testimonies from ' @/components/Testimonies';

export const siteTitle = 'Testimonies | Gospel Mission';

const TestimoniesPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Read inspiring testimonies from people around the world. - Gospel Mission"
        />
      </Head>
      <Testimonies />
    </Layout>
  );
};

export default TestimoniesPage;
