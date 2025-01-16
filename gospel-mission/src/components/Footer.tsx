import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 font-heading p-8 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-2xl text-white mb-4">About</h3>
          <p className="text-gray-400">
            Elder Andrew shares the beauty of the restored gospel of Jesus
            Christ through inspiring lessons, scriptures, and testimonies. Join
            us in discovering truth, strengthening faith, and spreading Christ’s
            light to all.
          </p>
        </div>
        <div className="hidden md:block">
          <h3 className="text-2xl text-white mb-4">Quick Links</h3>
          <ul className="text-gray-400">
            <li className="hover:text-white">
              <Link href="/home">Home</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/blog">Read</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/lessons">Lessons</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/testimonies">Testimonies</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl text-white mb-4">Contact</h3>
          <div className="flex flex-col items-center md:items-start">
            <p className="text-gray-400 mt-2 flex items-center">
              <FaPhone className="mr-2 line-through" /> +234 (123) 456-7890
            </p>
            <p className="text-gray-400 flex items-center whitespace-nowrap">
              <FaEnvelope className="mr-2" />
              <a
                href="mailto:thankgod.andrew@missionary.org"
                className="hover:text-white transition-colors"
              >
                thankgod.andrew@missionary.org
              </a>
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://www.facebook.com"
              className="text-blue-600 hover:text-white transform hover:scale-110 transition-transform"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.twitter.com"
              className="text-blue-400 hover:text-white transform hover:scale-110 transition-transform"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              className="text-pink-600 hover:text-white transform hover:scale-110 transition-transform"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.youtube.com"
              className="text-red-600 hover:text-white transform hover:scale-110 transition-transform"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-8">
        <p>
          &copy; {new Date().getFullYear()} Elder Andrew. All Rights Reserved.
        </p>
        <p>
          Visit
          <a
            href="https://www.churchofjesuschrist.org"
            className="text-blue-400 hover:underline"
            target="blank"
          >
            ChurchOfJesusChrist.org
          </a>
          <br />
          Schedule a visit with missionaries
          <a
            href="https://www.churchofjesuschrist.org/comeuntochrist"
            className="text-blue-400 hover:underline"
            target="blank"
          >
            ComeUntoChrist.org
          </a>
        </p>
        <br />
        <p>
          Except for those in the testimony section, all images on this site are
          the exclusive property of The Church of Jesus Christ of Latter-day
          Saints.
        </p>
      </div>
      <div className="text-center mt-4">
        <a
          href="#top"
          className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform"
        >
          Back to Top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
