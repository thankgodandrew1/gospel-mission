import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriberCount = () => {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error('Token is missing');
        }

        const response = await axios.get('/api/subscribe', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubscriberCount(response.data.count);
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriberCount();
  }, []);

  if (loading) {
    return <div>Loading subscriber count...</div>;
  }

  return (
    <div className="subscriber-count p-6 max-w-sm mx-auto bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-xl rounded-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <h3 className="text-3xl font-extrabold mb-4 tracking-wider font-heading">
        Total Blog Posts Subscribers
      </h3>
      <p className="text-2xl font-medium text-gray-100 text-center font-body">
        {subscriberCount !== null ? subscriberCount : 'Error loading count'}
      </p>
    </div>
  );
};

export default SubscriberCount;
