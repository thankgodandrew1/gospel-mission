import React, { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: '', email: '', message: '' });
        toast.success('Form submitted successfully! We will reach out soon.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Failed to submit the form. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { fontFamily: 'Segoe UI' },
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { fontFamily: 'Segoe UI' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-body">
      <ToastContainer />
      {/* Header Section */}
      <section className="py-16 text-center">
        <h1 className="text-5xl font-extrabold font-heading">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-300">
          We’re here to help and connect with you!
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-6 md:px-16">
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 bg-gray-700 rounded-lg text-gray-200 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 bg-gray-700 rounded-lg text-gray-200 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full mt-2 p-3 bg-gray-700 rounded-lg text-gray-200 border border-gray-600 focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="w-full lg:w-[20%] bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-12 px-6 md:px-16 bg-gray-900">
        <h2 className="text-3xl font-bold text-center">
          Find a Meetinghouse and Schedule a visit with missionaries
        </h2>
        <p className="text-center text-lg text-gray-300 mt-4">
          Locate the nearest Church meetinghouse using the link below:
        </p>
        <div className="mt-4 text-center">
          <Link
            href="https://www.churchofjesuschrist.org/maps/meetinghouses"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="inline-block text-blue-400 underline hover:text-blue-500">
              Church Meetinghouse Locator
            </span>
          </Link>
        </div>
        <p className="text-center text-lg text-gray-300 mt-4">
          Schedule a visit with missionaries using the link below:
        </p>
        <div className="mt-4 text-center">
          <Link
            href="https://www.churchofjesuschrist.org/comeuntochrist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="inline-block text-blue-400 underline hover:text-blue-500">
              Schedule a visit with missionaries
            </span>
          </Link>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-bl from-gray-800 via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Contact Information</h2>
          <p className="text-lg text-gray-300 mt-6">
            Feel free to reach out using the information below:
          </p>
          <div className="mt-8 space-y-4">
            <p className="line-through">
              <strong>Phone:</strong> +234 (123) 456-7890
            </p>
            <p>
              <strong>Email:</strong> thankgod.andrew@missionary.org
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
