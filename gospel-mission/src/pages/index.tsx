import React from 'react';
import Layout from ' @/components/Layout';
import HomeComponent from ' @/components/HomeComponent';
import Head from 'next/head';

export const siteTitle = 'Home Page | Gospel Mission';

const HomePage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Learn about the restored gospel and explore the lessons taught by missionaries. - Gospel Mission"
        ></meta>
      </Head>
      <HomeComponent />
    </Layout>
  );
};

export default HomePage;
