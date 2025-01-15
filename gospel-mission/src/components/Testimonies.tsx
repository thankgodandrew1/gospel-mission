import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Testimony {
  _id: string;
  name: string;
  testimony: string;
  imageUrl?: string;
  approved: boolean;
}

const Testimonies: React.FC = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);
  const testimoniesEndRef = useRef<HTMLDivElement>(null);
  const fetching = useRef<boolean>(false);
  const limit = 15;

  const fetchTestimonies = useCallback(async () => {
    if (loadedAll || loading || fetching.current) return;

    fetching.current = true;
    setLoading(true);

    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('Token is missing');
      }
      const response = await axios.get(
        `/api/testimonies?approved=true&skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newTestimonies = response.data.testimonies;

      if (newTestimonies.length === 0) {
        setLoadedAll(true);
      } else {
        setTestimonies((prevTestimonies) => [
          ...prevTestimonies,
          ...newTestimonies,
        ]);
        setSkip((prevSkip) => prevSkip + limit);
      }
    } catch (error) {
      console.error('Error fetching testimonies:', error);
    }

    fetching.current = false;
    setLoading(false);
  }, [skip, limit, loadedAll, loading]);

  useEffect(() => {
    fetchTestimonies();
  }, [fetchTestimonies]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          !loadedAll &&
          !fetching.current
        ) {
          fetchTestimonies();
        }
      },
      { threshold: 1 }
    );

    const currentRef = testimoniesEndRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, loadedAll, fetchTestimonies]);

  return (
    <div className="p-8 font-body bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen flex flex-col items-center">
      <h2 className="lg:text-5xl text-4xl font-extrabold mb-8 font-heading text-center text-blue-900 tracking-tight shadow-lg">
        All Testimonies
      </h2>
      <ul className="space-y-10 w-full max-w-4xl">
        {testimonies.map((testimony, index) => (
          <motion.li
            key={testimony._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between border-l-8 border-blue-600 transform hover:scale-105 transition-transform hover:shadow-2xl"
          >
            <div className="flex flex-col items-center md:flex-row mb-4 md:mb-0 md:flex-1">
              <Image
                src={
                  testimony.imageUrl ||
                  'https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico'
                }
                alt={testimony.name}
                width={80}
                height={80}
                className="rounded-full mb-4 md:mb-0 md:mr-6 shadow-lg hover:ring-4 ring-blue-300 transition-all"
              />
              <div className="text-center md:text-left">
                <p className="text-xl font-semibold text-gray-900">
                  {testimony.name}
                </p>
                <p className="text-gray-700 mt-2 italic leading-relaxed">
                  “{testimony.testimony}”
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
      <div ref={testimoniesEndRef} className="text-center mt-8">
        {loading && (
          <p className="text-blue-900">Loading more testimonies...</p>
        )}
        {loadedAll && (
          <p className="text-gray-600">All testimonies have been loaded.</p>
        )}
      </div>
    </div>
  );
};

export default Testimonies;
