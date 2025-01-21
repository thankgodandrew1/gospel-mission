import React from 'react';
import Layout from ' @/components/Layout';
import Head from 'next/head';
import Testimonies from ' @/components/Testimonies';

export const siteTitle = 'Testimonies | Gospel Mission';

const TestimoniesPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        {/* Page Title and Meta Description */}
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Read inspiring testimonies from people around the world and learn how the restored gospel has changed their lives."
        />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={siteTitle} />
        <meta
          property="og:description"
          content="Discover life-changing testimonies of faith and hope shared by people from different walks of life. Explore their stories on Gospel Mission."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gospel-mission.vercel.app/testimonies"
        />
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
          content="Explore inspiring testimonies of faith and how the restored gospel has impacted lives across the world."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta name="twitter:image:alt" content="Gospel Mission Logo" />

        {/* Canonical Link */}
        <link
          rel="canonical"
          href="https://gospel-mission.vercel.app/testimonies"
        />
      </Head>
      <Testimonies />
    </Layout>
  );
};

export default TestimoniesPage;
