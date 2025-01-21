import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Contact from ' @/components/Contact';

export default function ContactPage() {
  return (
    <Layout>
      <Head>
        {/* Page Title and Meta Description */}
        <title>Contact | Elder Andrew’s Gospel Mission</title>
        <meta
          name="description"
          content="Reach out to Elder Andrew to learn more about his mission and how you can connect with the Gospel Mission."
        />

        {/* Open Graph Metadata */}
        <meta
          property="og:title"
          content="Contact | Elder Andrew’s Gospel Mission"
        />
        <meta
          property="og:description"
          content="Get in touch with Elder Andrew to learn more about the restored gospel and his mission."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gospel-mission.vercel.app/contact"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta property="og:image:alt" content="Gospel Mission Logo" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact | Elder Andrew’s Gospel Mission"
        />
        <meta
          name="twitter:description"
          content="Reach out to Elder Andrew to learn more about his mission and the restored gospel."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico"
        />
        <meta name="twitter:image:alt" content="Gospel Mission Logo" />

        {/* Canonical Link */}
        <link
          rel="canonical"
          href="https://gospel-mission.vercel.app/contact"
        />
      </Head>
      <Contact />
    </Layout>
  );
}
