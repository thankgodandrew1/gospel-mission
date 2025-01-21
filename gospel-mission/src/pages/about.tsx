import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import About from ' @/components/About';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        {/* Basic Metadata */}
        <title>About | Elder Andrew’s Gospel Mission</title>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Learn more about Elder Andrew, his mission to teach the restored gospel, and the purpose of this site."
        />
        <meta
          name="keywords"
          content="Elder Andrew, Gospel Mission, Restored Gospel, Christian Teachings"
        />
        <meta name="author" content="Elder Andrew" />

        {/* Open Graph Metadata */}
        <meta
          property="og:title"
          content="About | Elder Andrew’s Gospel Mission"
        />
        <meta
          property="og:description"
          content="Discover Elder Andrew's journey and mission to teach the restored gospel to people worldwide."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gospel-mission.vercel.app/about"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About | Elder Andrew’s Gospel Mission"
        />
        <meta
          name="twitter:description"
          content="Learn more about Elder Andrew, his mission to teach the restored gospel, and the purpose of this site."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="https://gospel-mission.vercel.app/about" />
      </Head>
      <About />
    </Layout>
  );
};

export default AboutPage;
