import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IPost } from ' @/models/Post';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchResults, setSearchResults] = useState<IPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [limit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  const hasFetchedPosts = useRef(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwt'); 
        if (!token) {
          throw new Error('Token is missing'); 
        }
        const response = await axios.get(
          `/api/posts?limit=${limit}&skip=${skip}` , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.posts.length < limit) {
          setLoadedAll(true);
        }
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    if (!hasFetchedPosts.current || skip > 0) {
      loadPosts();
      hasFetchedPosts.current = true;
    }
    setIsClient(true);
  }, [skip, limit]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('jwt'); 
      if (!token) {
        throw new Error('Token is missing'); 
      }
      const response = await axios.get(`/api/posts?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResults(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error('Error searching blog posts:', error);
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  const displayPosts = searchQuery.trim() ? searchResults : posts;

  return (
    <div className="font-body">
      <section className="lg:p-12 p-4 bg-gradient-to-t from-blue-300 to-white rounded-xl shadow-2xl mt-10">
        <h2 className="lg:text-5xl text-4xl font-heading font-extrabold text-gray-900 tracking-tighter text-center mb-10">
          Blog Posts
        </h2>
        <div className="mb-8 text-center relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by title or tag..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition duration-300 ease-in-out bg-white hover:bg-gray-50"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayPosts.map((post, index) => (
            <motion.div
              key={index}
              className="relative bg-black rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/post/${post._id}`} legacyBehavior>
                <a>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
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
                      {post.title}
                    </motion.h3>
                    <motion.p
                      className="text-lg text-gray-300 mb-4"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {post.description}
                    </motion.p>
                    <motion.p
                      className="text-sm text-gray-400 mb-6"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      By {post.author} |
                      {new Date(post.publishDate).toLocaleDateString()}
                    </motion.p>
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Read More
                    </motion.button>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
        {!loading && !loadedAll && !searchQuery.trim() && (
          <button
            onClick={handleLoadMore}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Load More
          </button>
        )}
        {loading && <p>Loading more posts...</p>}
        {loadedAll && !searchQuery.trim() && (
          <p className="mt-8 text-center text-gray-500">
            No more posts to load.
          </p>
        )}
        {searchResults.length === 0 && searchQuery.trim() && (
          <p className="mt-8 text-center text-gray-500">No posts found.</p>
        )}
      </section>
    </div>
  );
};

export default BlogPosts;
