import React from 'react';
import Layout from ' @/components/Layout';
import Head from 'next/head';
import BlogPosts from ' @/components/BlogPosts';

export const siteTitle = 'Blog Page | Gospel Mission';

const Blog = () => {
  return (
    <Layout>
      <Head>
        {/* Page Title and Meta Description */}
        <title>{siteTitle}</title>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Learn about the restored gospel and explore the lessons taught by missionaries. - Gospel Mission"
        />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={siteTitle} />
        <meta
          property="og:description"
          content="Discover inspiring stories, gospel lessons, and teachings shared by missionaries. Explore the Gospel Mission Blog."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gospel-mission.vercel.app/blog"
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
          content="Discover inspiring stories, gospel lessons, and teachings shared by missionaries. Explore the Gospel Mission Blog."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta name="twitter:image:alt" content="Gospel Mission Logo" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://gospel-mission.vercel.app/blog" />
      </Head>
      <BlogPosts />
    </Layout>
  );
};

export default Blog;
