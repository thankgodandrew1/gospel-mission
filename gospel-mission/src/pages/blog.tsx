import React from 'react';
import Layout from ' @/components/Layout';
import Head from 'next/head';
import BlogPosts from ' @/components/BlogPosts';

export const siteTitle = 'Blog Page | Gospel Mission';

const HomeTest = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Learn about the restored gospel and explore the lessons taught by missionaries. - Gospel Mission"
        ></meta>
      </Head>
      <BlogPosts />
    </Layout>
  );
};

export default HomeTest;
