import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IPost } from ' @/models/Post';
import Image from 'next/image';
import Layout from ' @/components/Layout';
import LoadingSpinner from ' @/components/LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Head from 'next/head';
import Link from 'next/link';
import { FaTwitter, FaCopy } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useReadingProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const totalDocScrollLength = docHeight - windowHeight;
    const scrollPosition = scrollTop / totalDocScrollLength;

    setReadingProgress(scrollPosition * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return readingProgress;
};

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const readingProgress = useReadingProgress();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const token = localStorage.getItem('jwt');
          if (!token) {
            throw new Error('Token is missing');
          }
          const response = await axios.get(`/api/posts?postId=${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPost(response.data.post);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching blog post:', error);
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [id]);

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || 'Check out this post!');
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      '_blank'
    );
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', {
      position: 'bottom-right',
      autoClose: 3000,
      style: { fontFamily: 'Segoe UI' },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{post?.title ? post.title : 'Loading...'}</title>
      </Head>
      <div
        className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50"
        style={{ width: `${readingProgress}%` }}
      ></div>
      <div className="container mx-auto p-6 md:p-8 font-body transition duration-500">
        <div className="flex justify-between items-center mb-4">
          <nav className="text-gray-600">
            <Link href="/blog" passHref>
              <span className="hover:text-gray-800 cursor-pointer">Blogs</span>
            </Link>
            / <span className="text-gray-800">{post?.title}</span>
          </nav>
          <div className="flex space-x-2">
            <button
              onClick={shareOnTwitter}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <FaTwitter />
            </button>
            <button
              onClick={copyLink}
              className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              <FaCopy />
            </button>
          </div>
        </div>
        {post?.image && (
          <div className="mb-8">
            <Image
              src={post.image}
              alt={post.title}
              width={900}
              height={500}
              objectFit="cover"
              className="rounded-lg shadow-xl mx-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center font-heading">
          {post?.title}
        </h1>
        <p className="text-gray-700 mb-8 text-center text-xl">
          By <span className="font-semibold">{post?.author}</span> |
          {new Date(post?.publishDate || '').toLocaleDateString()}
        </p>
        <div className="prose lg:prose-xl mx-auto p-6 rounded-lg shadow-lg transition-all duration-500">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ ...props }) => (
                <Image
                  width={800}
                  height={500}
                  className="rounded-lg shadow-lg mx-auto transition-transform duration-300 hover:scale-105"
                  alt={props.alt || 'Blog post image'}
                  {...props}
                />
              ),
            }}
          >
            {post?.content || ''}
          </ReactMarkdown>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default BlogPostPage;
