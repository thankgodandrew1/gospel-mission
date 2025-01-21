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
import { FaCopy } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

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
  const { slug } = router.query;
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const readingProgress = useReadingProgress();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const token = localStorage.getItem('jwt');
          if (!token) {
            throw new Error('Token is missing');
          }
          const response = await axios.get(`/api/posts?postId=${slug}`, {
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
  }, [slug]);

  const shareOnTwitter = () => {
    if (!post) return; 
  
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || 'Check out this post!');
    const image = encodeURIComponent(post?.image || 'https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico'); // Default image fallback
    
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}&image=${image}`,
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

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-body text-center p-4">
        <Image
          src="/images/post-404-image.svg"
          alt="404 - Not Found"
          width={300}
          height={300}
          className="mb-8"
        />
        <h1 className="text-5xl font-bold font-heading text-gray-800 mb-4">
          404 - Post Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the post you are looking for could not be found. It might have
          been removed, renamed, or temporarily unavailable. Please check the
          URL for any errors or try searching for the post using the{' '}
          <b>
            <Link href="/blog" className="underline text-blue-900 pr-1">
              search bar.
            </Link>
          </b>
          If you believe this is an error, feel free to{' '}
          <b>
            <Link href="/contact" className="underline text-blue-900 pr-1">
              contact us
            </Link>
          </b>{' '}
          or return to the homepage to continue browsing.
        </p>
        <Link href="/">
          <span className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
            Go Back Home
          </span>
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        {/* Dynamic Page Title */}
        <title>{post?.title ? post.title : 'Loading...'}</title>
        <meta
          name="description"
          content={
            post?.description ||
            'Read this inspiring blog post on Gospel Mission.'
          }
        />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={post?.title || 'Blog Post'} />
        <meta
          property="og:description"
          content={
            post?.description ||
            'Read this inspiring blog post on Gospel Mission.'
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content={
            post?.image ||
            'https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico'
          }
        />
        <meta property="og:image:alt" content="Blog Post Image" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title || 'Blog Post'} />
        <meta
          name="twitter:description"
          content={
            post?.description ||
            'Read this inspiring blog post on Gospel Mission.'
          }
        />
        <meta
          name="twitter:image"
          content={
            post?.image ||
            'https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico'
          }
        />
        <meta name="twitter:image:alt" content="Blog Post Image" />

        {/* Canonical Link */}
        <link rel="canonical" href={window.location.href} />
      </Head>
      <div
        className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50"
        style={{ width: `${readingProgress}%` }}
      ></div>
      <div className="container mx-auto p-6 md:p-8 font-body bg-white transition duration-500">
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
              className="p-2 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1A91DA] transition-colors"
            >
              <FontAwesomeIcon icon={faXTwitter} />
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
        <h1 className="text-4xl text-black md:text-5xl font-bold mb-2 text-center font-heading">
          {post?.title}
        </h1>
        <p className="text-gray-700 mb-8 text-center text-xl">
          By <span className="font-semibold">{post?.author}</span> |{' '}
          {new Date(post?.publishDate || '').toLocaleDateString()}
        </p>
        <div className="prose bg-white lg:prose-xl mx-auto p-6 rounded-lg shadow-lg transition-all duration-500">
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
