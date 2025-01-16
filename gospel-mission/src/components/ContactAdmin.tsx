import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactAdmin: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('Token is missing');
      }
      const res = await fetch('/api/contact', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(data.contacts);
      } else {
        toast.error('Failed to fetch messages.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async () => {
    if (!selectedMessageId) return;

    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('Token is missing');
      }
      const res = await fetch(`/api/contact?contactId=${selectedMessageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessages(
          messages.filter((message) => message._id !== selectedMessageId)
        );
        toast.success('Message deleted successfully.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Failed to delete message.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setShowModal(false);
      setSelectedMessageId(null);
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedMessageId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedMessageId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-body text-black">
      <ToastContainer />
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold font-heading">
          Admin Contact Messages
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Manage contact messages from users.
        </p>
      </section>
      <section className="py-12 px-2 md:px-16">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Messages</h2>
          {isLoading ? (
            <p>Loading messages...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Message</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message._id}>
                      <td className="py-2 px-4 border-b text-[18px]">{message.name}</td>
                      <td className="py-2 px-4 border-b text-[18px]">{message.email}</td>
                      <td className="py-2 px-4 border-b text-[18px]">{message.message}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => openDeleteModal(message._id)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200 text-[18px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Message
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this message? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={deleteMessage}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactAdmin;
