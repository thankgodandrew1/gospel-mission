import React from 'react';
import Layout from ' @/components/Layout';
import HomeComponent from ' @/components/HomeComponent';
import Head from 'next/head';

export const siteTitle = 'Home Page | Gospel Mission';

const HomePage = () => {
  return (
    <Layout>
      <Head>
        {/* Page Title and Meta Description */}
        <title>{siteTitle}</title>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Welcome to Gospel Mission! Learn about the restored gospel and explore inspiring lessons taught by Elder Andrew and other missionaries."
        />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={siteTitle} />
        <meta
          property="og:description"
          content="Discover the Gospel Mission and join us in spreading the restored gospel of Jesus Christ to the world."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gospel-mission.vercel.app/" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta property="og:image:alt" content="Gospel Mission Logo" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta
          name="twitter:description"
          content="Explore Gospel Mission and learn about the restored gospel of Jesus Christ through inspiring teachings and stories."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta name="twitter:image:alt" content="Gospel Mission Logo" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://gospel-mission.vercel.app/" />
      </Head>
      <HomeComponent />
    </Layout>
  );
};

export default HomePage;
