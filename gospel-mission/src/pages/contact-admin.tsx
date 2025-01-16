import React from 'react';
import Layout from ' @/components/Layout';
import ContactAdmin from ' @/components/ContactAdmin';
import Head from 'next/head';
import withAuth from ' @/hoc/withAuth';
import Link from 'next/link';

export const siteTitle = 'Contact Admin | Gospel Mission';

const ContactAdminPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Manage contact messages from users. - Gospel Mission"
        />
      </Head>
      <div className="p-2 md:p-8">
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
            Manage Blog Posts
          </h2>
          <Link href={`/admin?token=${process.env.NEXT_PUBLIC_SECRET_TOKEN}`}>
            <span className="px-4 py-2 bg-blue-600 font-body text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Go to Blog Posts Management
            </span>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Manage Contact Messages
          </h2>
        </div>
        <ContactAdmin />
      </div>
    </Layout>
  );
};

export default withAuth(ContactAdminPage);
