import React, { useEffect, useState } from 'react';
import { fetchLessons } from ' @/utils/fetchLessons';
import { Lesson } from ' @/types/Lesson';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const HomeComponent = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showTestimonyModal, setShowTestimonyModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleShareTestimony = () => {
    console.log('Testimony submitted!');
    setShowTestimonyModal(false);
  };

  const featuredBlogs = [
    {
      title: 'The Restoration of the Gospel',
      content:
        'Discover how the Gospel of Jesus Christ was restored in these latter days, bringing light and truth to the world.',
      image: '/images/lesson1.jpg',
      author: 'Elder Andrew',
      publishDate: new Date(),
    },
    {
      title: 'The Plan of Salvation',
      content:
        'Learn about God’s plan for your happiness and how you can find peace and purpose in your life.',
      image: '/images/lesson2.jpg',
      author: 'Elder Andrew',
      publishDate: new Date(),
    },
    {
      title: 'Families and Temples',
      content:
        'Explore the eternal significance of families and the sacred ordinances performed in holy temples.',
      image: '/images/lesson3.jpg',
      author: 'Elder Andrew',
      publishDate: new Date(),
    },
    {
      title: 'Faith and Obedience',
      content:
        'Understand the role of faith and obedience in drawing closer to Christ and receiving His blessings.',
      image: '/images/lesson4.jpg',
      author: 'Elder Andrew',
      publishDate: new Date(),
    },
  ];

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await fetchLessons();
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    loadLessons();
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="font-body">
      {/* Welcome Section */}
      {/* Welcome Section */}
      <section
        className="relative p-16 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/logo.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-transparent to-blue-800 opacity-70"></div>
        <div id="particles-js" className="absolute inset-0"></div>
        <div className="relative flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold font-heading text-white tracking-wider drop-shadow-lg animate-fade-in">
            Welcome to Elder Andrew’s Blog
          </h1>
          <p className="mt-4 text-xl text-white drop-shadow-md tracking-wider animate-slide-up">
            Learn about the restored gospel and explore the lessons taught by
            missionaries.
          </p>
          <Link href="/lessons" legacyBehavior>
            <button className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
              Explore Lessons
            </button>
          </Link>
        </div>
      </section>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Welcome Message Section */}
      <motion.section
        className="p-4 md:p-6 lg:p-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500 w-[95%] md:w-[80%] lg:w-[70%] m-auto mt-5 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-25 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
        <div
          className="absolute inset-0 pointer-events-none"
          id="particles-js"
        ></div>
        <div className="flex flex-col items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative group transform hover:scale-105 transition-transform"
          >
            <Image
              src="/images/elder-andrew.jpg"
              alt="Elder Andrew"
              width={128}
              height={120}
              className="rounded-full mb-4 shadow-lg"
            />
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-gray-800 text-white text-sm rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Elder Andrew
            </span>
          </motion.div>
          <h2 className="text-4xl font-heading font-bold text-gray-900 text-center mb-6 relative z-10">
            Welcome Message
          </h2>
          <motion.p
            className="text-2xl text-left text-blue-900 bg-white p-8 rounded-xl shadow-lg relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Hello and welcome! 🌟
            <br />
            <br />
            This is where Elder Andrew shares the beauty of the restored gospel
            of Jesus Christ through inspiring lessons, scriptures, and
            testimonies. From The Plan of Salvation to Families and Temples,
            explore teachings that uplift, guide, and bring you closer to the
            Savior.
            <br />
            Join us in discovering truth, strengthening faith, and spreading
            Christ’s light to all.
            <br />
            <br />
            <b>“Let your light so shine before men”</b> (Matthew 5:16).
            <br />
            <br />
            We’re glad you’re here—enjoy the journey!
            <br />
            <br />
            Blessings,
            <br />
            Elder Andrew
          </motion.p>
          <motion.div
            className="mt-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Link href="/about">
              <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-transform">
                Learn More About Elder Andrew
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Blog Posts */}
      <section className="p-12 bg-gradient-to-t from-blue-300 to-white rounded-xl shadow-2xl mt-10">
        <h2 className="text-5xl font-heading font-bold text-gray-900 text-center mb-10">
          Featured Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={index}
              className="relative bg-black rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 transition-opacity duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-800 to-transparent opacity-75"></div>
              <div className="relative z-10 p-8 flex flex-col justify-end h-full text-white space-y-6">
                <motion.h3
                  className="text-4xl font-bold text-white font-heading mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {blog.title}
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-300 mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {blog.content}
                </motion.p>
                <motion.p
                  className="text-sm text-gray-400 mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  By {blog.author} |{' '}
                  {new Date(blog.publishDate).toLocaleDateString()}
                </motion.p>
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Read More
                </motion.button>
              </div>
              <motion.div
                className="absolute top-4 right-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full group-hover:scale-105 transition-transform"
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m0 0a9 9 0 11-6.3 16.1 9 9 0 016.3-16.1z"
                  ></path>
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Missionary Lessons Section */}
      <section className="p-8 bg-gradient-to-t from-blue-200 to-white">
        <h2 className="text-4xl font-heading font-bold text-gray-900 text-center mb-8">
          Continue Your Journey with These Missionary Lessons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={lesson.image}
                  alt={lesson.title}
                  width={600}
                  height={160}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 font-heading">
                  {lesson.title}
                </h3>
                <p className="text-gray-700 mt-2">{lesson.description}</p>
                <a
                  href={lesson.pamphletLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:shadow-lg transition-transform"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonies Section */}
      <section className="relative bg-gradient-to-t from-blue-100 to-white py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-25 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-heading font-bold text-gray-900 mb-6 gradient-text">
            Inspiring Testimonies
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Hear from others about the light of Christ in their lives, or share
            your own testimony to uplift others.
          </p>
          {/* Static Testimonies */}
          <div className="relative grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Sister Emily',
                testimony:
                  'The Plan of Salvation has changed my life and given me hope for eternity.',
                image: '/images/lesson1.jpg',
              },
              {
                name: 'Brother James',
                testimony:
                  'The gospel brought my family together, and I feel closer to Christ every day.',
                image: '/images/lesson2.jpg',
              },
              {
                name: 'Sister Grace',
                testimony:
                  'Through temple ordinances, I’ve found peace and purpose in life.',
                image: '/images/lesson3.jpg',
              },
            ].map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className="p-6 bg-white shadow-lg rounded-xl relative transform hover:scale-105 transition-transform hover:shadow-2xl"
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 shadow-md"
                  width={64}
                  height={64}
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 gradient-text">
                  {person.name}
                </h3>
                <p className="text-gray-600 italic">“{person.testimony}”</p>
              </motion.div>
            ))}
          </div>
          {/* Share Testimony Button */}
          <div className="mt-12">
            <button
              onClick={() => setShowTestimonyModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Share Your Testimony
            </button>
          </div>
        </div>

        {/* Testimony Submission Modal */}
        {showTestimonyModal && (
          <div className="fixed z-10 inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full"
            >
              <h3 className="text-2xl font-heading text-gray-900 mb-4">
                Share Your Testimony
              </h3>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                required
              />
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="image"
              >
                Upload Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Upload Image"
              />
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="testimony"
              >
                Your Testimony
              </label>
              <textarea
                id="testimony"
                className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your testimony here..."
                required
                rows={5}
              />
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
                  onClick={() => setShowTestimonyModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleShareTestimony}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #4e54c8, #8f94fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(30px, -50px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }
      `}</style>
    </div>
  );
};

export default HomeComponent;
