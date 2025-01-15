import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Custom404: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-body text-center p-4">
      <Image
        src="/images/404-image.svg"
        alt="404 - Not Found"
        width={300}
        height={300}
        className="mb-8"
      />
      <h1 className="text-5xl font-bold font-heading text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Link href="/">
        <span className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
          Go Back Home
        </span>
      </Link>
    </div>
  );
};

export default Custom404;
