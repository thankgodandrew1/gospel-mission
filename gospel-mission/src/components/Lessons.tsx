import { useEffect, useState } from 'react';
import { fetchLessons } from ' @/utils/fetchLessons';
import { Lesson } from ' @/types/Lesson';
import Image from 'next/image';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllLessons = async () => {
      try {
        const lessons = await fetchLessons();
        setLessons(lessons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchAllLessons();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="font-body bg-gray-50">
      <section className="p-8 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <h2 className="lg:text-4xl text-3xl font-heading font-bold text-gray-900 text-center mb-10 tracking-tight">
          Continue Your Journey with These Missionary Lessons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform transition-transform"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={lesson.image}
                  alt={lesson.title}
                  width={600}
                  height={200}
                  className="object-cover w-full  transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {lesson.description}
                </p>
                <a
                  href={lesson.pamphletLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
