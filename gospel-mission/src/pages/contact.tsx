import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Contact from ' @/components/Contact';

export default function ContactPage() {
  return (
    <Layout>
      <Head>
        <title>Contact | Elder Andrew’s Gospel Mission</title>
        <meta
          name="description"
          content="Learn more about Elder Andrew, his mission to teach the restored gospel, and the purpose of this site."
        />
      </Head>
      <Contact />
    </Layout>
  );
}
