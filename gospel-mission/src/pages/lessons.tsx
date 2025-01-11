import React from 'react';
import Layout from ' @/components/Layout';
import Lessons from ' @/components/Lessons';
import Head from 'next/head';

export const siteTitle = 'Lessons Page | Gospel Mission';

export default function LessonPage() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Learn about the restored gospel and explore the lessons taught by missionaries. - Gospel Mission"
        ></meta>
      </Head>
      <Lessons />
    </Layout>
  );
}
