import React from 'react';
import Layout from ' @/components/Layout';
import Admin from ' @/components/Admin';
import Head from 'next/head';
import Link from 'next/link';
import withAuth from ' @/hoc/withAuth';
import SubscriberCount from ' @/components/SubscriberCount';

export const siteTitle = 'Admin Page | Gospel Mission';

const AdminPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Manage blog posts. - Gospel Mission"
        />
      </Head>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 font-heading">
          Admin Dashboard
        </h1>
        <div className="mt-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Manage Testimonies
          </h2>
          <Link
            href={`/admin-testimonies?token=${process.env.NEXT_PUBLIC_SECRET_TOKEN}`}
          >
            <span className="px-4 py-2 bg-blue-600 font-body text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Go to Testimonies Management
            </span>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Manage Contact Messages
          </h2>
          <Link
            href={`/contact-admin?token=${process.env.NEXT_PUBLIC_SECRET_TOKEN}`}
          >
            <span className="px-4 py-2 bg-blue-600 font-body text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Go to Contact Messages Management
            </span>
          </Link>
        </div>
        <SubscriberCount />
        <Admin />
      </div>
    </Layout>
  );
};

export default withAuth(AdminPage);
