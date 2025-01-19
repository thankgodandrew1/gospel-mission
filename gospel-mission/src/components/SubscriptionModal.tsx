import React from 'react';

interface SubscriptionModalProps {
  showModal: boolean;
  handleClose: () => void;
  handleSubscribe: (event: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: (email: string) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  showModal,
  handleClose,
  handleSubscribe,
  email,
  setEmail,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-25 animate-pulse"></div>{' '}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>{' '}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>{' '}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="relative z-10 w-full font-body">
          <div className="flex justify-end">
            <button
              className="text-gray-800 font-bold text-2xl"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
          <h3 className="text-3xl font-heading font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-center">
            Subscribe to Our Blog
          </h3>
          <p className="mb-4 text-lg text-gray-700 text-center">
            Stay updated with our latest blog posts. Subscribe now to get
            notifications directly to your inbox!
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col items-center w-full"
          >
            <input
              type="email"
              className="p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
