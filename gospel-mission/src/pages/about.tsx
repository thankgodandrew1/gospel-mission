import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import About from ' @/components/About';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>About | Elder Andrew’s Gospel Mission</title>
        <meta
          name="description"
          content="Learn more about Elder Andrew, his mission to teach the restored gospel, and the purpose of this site."
        />
      </Head>
      <About />
    </Layout>
  );
};

export default AboutPage;
