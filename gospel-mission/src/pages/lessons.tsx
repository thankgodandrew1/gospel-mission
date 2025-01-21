import React from 'react';
import Layout from ' @/components/Layout';
import Lessons from ' @/components/Lessons';
import Head from 'next/head';

export const siteTitle = 'Lessons Page | Gospel Mission';

export default function LessonPage() {
  return (
    <Layout>
      <Head>
        {/* Page Title and Meta Description */}
        <title>{siteTitle}</title>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Explore the missionary lessons to learn more about the restored gospel of Jesus Christ and its teachings."
        />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={siteTitle} />
        <meta
          property="og:description"
          content="Discover the lessons shared by missionaries to deepen your understanding of the restored gospel and its message."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gospel-mission.vercel.app/lessons"
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
          content="Learn more about the restored gospel of Jesus Christ by exploring missionaries inspiring lessons and teachings."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta name="twitter:image:alt" content="Gospel Mission Logo" />

        {/* Canonical Link */}
        <link
          rel="canonical"
          href="https://gospel-mission.vercel.app/lessons"
        />
      </Head>
      <Lessons />
    </Layout>
  );
}
