import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Testimony {
  _id: string;
  name: string;
  testimony: string;
  imageUrl?: string;
  approved: boolean;
}

const AdminTestimonies: React.FC = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token is missing');
    }
    const response = await axios.get('/api/testimonies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTestimonies(response.data.testimonies);
  };

  const handleApprove = async (id: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token is missing');
    }
    await axios.put(
      '/api/testimonies',
      { id, approved: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTestimonies();
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token is missing');
    }
    await axios.delete(`/api/testimonies?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTestimonies();
    setShowDeleteModal(false);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-8 font-body bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 font-heading text-center text-blue-700">
        Testimonies Management
      </h2>
      <ul className="space-y-6">
        {testimonies.map((testimony) => (
          <li
            key={testimony._id}
            className="bg-white mx-[-20px] p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between border-l-4 border-blue-500"
          >
            <div className="flex flex-col items-center mb-4 md:flex-row md:mb-0 md:flex-1">
              <Image
                src={
                  testimony.imageUrl ||
                  'https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico'
                }
                alt={testimony.name}
                width={64}
                height={64}
                className="rounded-full mb-4 md:mb-0 md:mr-4 shadow-lg"
              />
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-gray-800">
                  {testimony.name}
                </p>
                <p className="text-gray-600 mt-2 italic">
                  “{testimony.testimony}”
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleApprove(testimony._id)}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${
                  testimony.approved
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                } transition ease-in-out duration-300`}
                disabled={testimony.approved}
              >
                {testimony.approved ? 'Approved' : 'Approve'}
              </button>
              <button
                onClick={() => confirmDelete(testimony._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition ease-in-out duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-60 flex items-center justify-center overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full max-h-screen overflow-y-auto"
          >
            <h3 className="text-2xl font-heading text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this testimony?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => handleDelete(deleteId!)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonies;
