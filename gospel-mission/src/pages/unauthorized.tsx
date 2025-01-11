import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Unauthorized: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Unauthorized Access - Gospel Mission</title>
        <meta
          name="description"
          content="You do not have permission to view this page."
        />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center font-body bg-gray-100 p-8">
        <h1 className="text-5xl font-extrabold text-red-600 mb-8 font-heading">
          Unauthorized Access
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </>
  );
};

export default Unauthorized;
