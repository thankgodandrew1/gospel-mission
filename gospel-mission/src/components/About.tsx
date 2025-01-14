import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-body">
      {/* Hero Section */}
      <section className="relative text-center py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 opacity-30 blur-2xl"></div>
        <h1 className="text-5xl font-extrabold font-heading tracking-wide leading-tight z-10 relative">
          Sharing the Restored Gospel
        </h1>
        <p className="mt-4 text-xl z-10 relative opacity-90">
          Elder Andrew’s Mission to Inspire and Teach
        </p>
        <div className="mt-6 mx-auto w-40 h-40 relative rounded-full overflow-hidden shadow-2xl ring-4 ring-white z-10">
          <Image
            src="https://res.cloudinary.com/dqsslvhbj/image/upload/v1736422922/hske5dk7pyybysew8uyj.jpg"
            alt="Elder Andrew"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="mt-8 z-10 relative">
          <Link href="/contact">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition duration-300">
              Get in Touch
            </span>
          </Link>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <h2 className="text-3xl font-extrabold text-center font-heading text-white">
          Meet Elder Andrew
        </h2>
        <div className="mt-8 max-w-4xl mx-auto text-center text-gray-300">
          <p className="text-lg leading-relaxed">
            Elder Andrew is a full-time missionary of The Church of Jesus Christ
            of Latter-day Saints. He’s passionate about sharing the teachings of
            the restored gospel and helping others grow in their faith and
            understanding of Jesus Christ. With a heart full of compassion and a
            strong faith, Elder Andrew is committed to serving the community and
            spreading the message of hope and love.
          </p>
        </div>
      </section>

      {/* Mission and Purpose */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-bl from-black via-gray-800 to-gray-900">
        <h2 className="text-3xl font-extrabold text-center font-heading text-white">
          Our Mission
        </h2>
        <p className="mt-8 max-w-3xl mx-auto text-center text-gray-300 text-lg leading-relaxed">
          This platform was created to teach gospel principles, provide
          resources for spiritual growth, and inspire others to live a
          Christ-centered life. Through blogs, lessons, and resources, Elder
          Andrew hopes to guide visitors on their faith journey.
        </p>
      </section>

      {/* What You'll Find */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-3xl font-extrabold text-center font-heading text-white">
          What You’ll Find Here
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: 'Blog',
              description:
                'Inspirational articles on gospel topics to uplift your faith journey.',
            },
            {
              title: 'Lessons',
              description:
                'Explore missionary teachings like \u201CThe Restoration\u201D and \u201CThe Plan of Salvation\u201D.',
            },
            {
              title: 'Resources',
              description:
                'Links to official Church pamphlets and testimonies shared by others.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white shadow-lg rounded-lg hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-lg font-heading font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-[16px] opacity-90 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-bl from-gray-800 via-gray-900 to-black">
        <h2 className="text-3xl font-extrabold text-center font-heading text-white">
          Our Core Goals
        </h2>
        <div className="mt-8 max-w-4xl mx-auto text-center text-gray-300">
          <ul className="list-none space-y-4">
            {['Teach', 'Inspire', 'Connect'].map((goal, index) => (
              <li key={index} className="text-lg">
                <strong className="text-white">{goal}:</strong>{' '}
                {goal === 'Teach'
                  ? 'Offering in-depth lessons and insights into the restored gospel.'
                  : goal === 'Inspire'
                    ? 'Sharing inspiring stories and experiences of faith and service.'
                    : 'Building a community of like-minded individuals seeking spiritual growth and understanding.'}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-br from-black to-gray-900">
        <h2 className="text-3xl font-extrabold text-center font-heading text-white">
          Get in Touch
        </h2>
        <div className="mt-8 max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-300">
            Have questions or want to learn more? Reach out to Elder Andrew
            through our{' '}
            <Link href="/contact">
              <span className="text-blue-400 underline hover:text-blue-500">
                contact page
              </span>
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
