import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IPost } from ' @/models/Post';
import ImageUpload from ' @/components/ImageUpload';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [newPost, setNewPost] = useState<Partial<IPost>>({
    title: '',
    content: '',
    image: '',
    author: '',
    publishDate: new Date(),
    description: '',
    tags: [],
  });
  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error('Token is missing');
        }
        const response = await axios.get('/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const tags = value.split(',').map((tag) => tag.trim());
    setNewPost({ ...newPost, tags });
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('Token is missing');
      }

      const response = await axios.post('/api/posts', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts([...posts, response.data.post]);
      setNewPost({
        title: '',
        content: '',
        image: '',
        author: '',
        publishDate: new Date(),
        description: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editingPost) return;
    const { name, value } = e.target;
    setEditingPost({ ...editingPost, [name]: value } as IPost);
  };

  const handleEditTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingPost) return;
    const { value } = e.target;
    const tags = value.split(',').map((tag) => tag.trim());
    setEditingPost({ ...editingPost, tags } as IPost);
  };

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('Token is missing');
      }
      const response = await axios.put(
        `/api/posts`,
        {
          ...editingPost,
          postId: editingPost._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(
        posts.map((post) =>
          post._id === editingPost._id ? response.data.post : post
        )
      );
      setEditingPost(null);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('Token is missing');
      }

      await axios.delete(`/api/posts?postId=${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (post: IPost) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <div className='bg-white m-[-7px]'>
    <div className="container mx-auto p-3 max-w-6xl font-body mt-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 rounded-lg shadow-xl border border-gray-700">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
        Post Management Dashboard
      </h1>

      {/* Create Post Form */}
      <form
        onSubmit={handleCreatePost}
        className="mb-12 p-3 bg-gray-800 rounded-lg shadow-md"
      >
        <h2 className="text-2xl md:3xl font-semibold mb-6 text-teal-300">
          Create New Post
        </h2>
        {/* Form Fields */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-400">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            required
            className="mt-2 block w-full h-12 text-lg row-span-2 bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-400">
            Description:
          </label>
          <textarea
            name="description"
            value={newPost.description}
            onChange={handleInputChange}
            required
            maxLength={300}
            className="mt-2 block w-full text-lg bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <label className="text-lg font-medium text-gray-400 flex items-center">
            Content (Markdown Supported):
            <FaInfoCircle
              className="ml-2 cursor-pointer text-teal-400"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            />
          </label>
          {tooltipVisible && (
            <div className="absolute z-10 p-3 bg-gray-900 border border-teal-500 rounded-lg shadow-lg mt-2">
              <p className="font-medium text-teal-300">Markdown Guide:</p>
              <ul className="mt-2 text-sm text-gray-400 space-y-1">
                <li>
                  <strong># Heading 1</strong>
                </li>
                <li>
                  <strong>## Heading 2</strong>
                </li>
                <li>
                  <strong>[Link Text](url)</strong>
                </li>
                <li>
                  <strong>**Bold Text**</strong>
                </li>
                <li>
                  <strong>*Italic Text*</strong>
                </li>
                <li>
                  <strong>- List item</strong>
                </li>
                <li>
                  <strong>`Inline Code`</strong>
                </li>
              </ul>
            </div>
          )}
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            required
            className="mt-2 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            rows={6}
          />
        </div>
        <div className="mb-4 bg-gray-100 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview:
          </label>
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {newPost.content || '_Write something to preview it here..._'}
            </ReactMarkdown>
          </div>
        </div>
        {/* Image Upload and other fields */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-400">
            Image:
          </label>
          <ImageUpload
            onUpload={(url) => setNewPost({ ...newPost, image: url })}
          />
        </div>
        {/* Author, Publish Date, Tags */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-400">
            Author:
          </label>
          <input
            type="text"
            name="author"
            value={newPost.author}
            onChange={handleInputChange}
            required
            className="mt-2 block w-full h-12 text-lg bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 w-full justify-between">
          {/* Publish Date Field */}
          <div className="mb-4 md:flex-1">
            <label className="block text-lg font-medium text-gray-400">
              Publish Date:
            </label>
            <input
              type="date"
              name="publishDate"
              value={newPost.publishDate?.toString().split('T')[0]}
              onChange={handleInputChange}
              required
              className="mt-2 block w-full h-12 bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tags Field */}
          <div className="mb-4 md:flex-1">
            <label className="block text-lg font-medium text-gray-400">
              Tags (comma separated):
            </label>
            <input
              type="text"
              name="tags"
              value={newPost.tags?.join(', ')}
              onChange={handleTagsChange}
              required
              className="mt-2 block w-full h-12 text-lg bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full md:flex md:justify-start md:w-[12%] text-center bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-5 rounded-md shadow-md hover:from-blue-600 hover:to-teal-600 transition-all"
          >
            Create Post
          </button>
        </div>
      </form>
      <hr />
      {/* Edit Post Form */}
      {editingPost && (
        <form
          onSubmit={handleEditPost}
          className="mb-12 mt-5 bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-semibold mb-6 font-heading text-teal-300">
            Edit Post
          </h2>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-400">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={editingPost.title}
              onChange={handleEditInputChange}
              required
              className="mt-2 block w-full h-12 text-lg bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-400">
              Description:
            </label>
            <textarea
              name="description"
              value={editingPost.description}
              onChange={handleEditInputChange}
              required
              maxLength={300}
              className="mt-2 block w-full text-lg bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6 relative">
            <label className="text-lg font-medium text-gray-400 flex items-center">
              Content (Markdown Supported):
              <FaInfoCircle
                className="ml-2 cursor-pointer text-blue-500"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              />
            </label>
            {tooltipVisible && (
              <div className="absolute z-10 p-3 bg-gray-900 border border-teal-500 rounded-lg shadow-lg mt-2">
                <p className="font-medium text-teal-300">Markdown Guide:</p>
                <ul className="mt-2 text-sm text-gray-400 space-y-1">
                  <li>
                    <strong># Heading 1</strong>
                  </li>
                  <li>
                    <strong>## Heading 2</strong>
                  </li>
                  <li>
                    <strong>[Link Text](url)</strong>
                  </li>
                  <li>
                    <strong>**Bold Text**</strong>
                  </li>
                  <li>
                    <strong>*Italic Text*</strong>
                  </li>
                  <li>
                    <strong>- List item</strong>
                  </li>
                  <li>
                    <strong>`Inline Code`</strong>
                  </li>
                </ul>
              </div>
            )}
            <textarea
              name="content"
              value={editingPost.content}
              onChange={handleEditInputChange}
              required
              className="mt-2 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              rows={6}
            />
          </div>
          <div className="mb-4 bg-gray-100 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview:
            </label>
            <div className="prose prose-sm  sm-prose lg:prose-lg xl-prose-xl prose-indigo max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {editingPost.content ||
                  '_Write something to preview it here..._'}
              </ReactMarkdown>
            </div>
          </div>
          {/* Image Upload and other fields */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-400">
              Image:
            </label>
            <ImageUpload
              onUpload={(url) =>
                setEditingPost({ ...editingPost, image: url } as IPost)
              }
            />
          </div>
          {/* Author, Publish Date, Tags */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-400">
              Author:
            </label>
            <input
              type="text"
              name="author"
              value={editingPost.author}
              onChange={handleEditInputChange}
              required
              className="mt-2 block w-full h-12 text-lg bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 w-full justify-between">
            {/* Publish Date Field */}
            <div className="mb-4 md:flex-1">
              <label className="block text-lg font-medium text-gray-400">
                Publish Date:
              </label>
              <input
                type="date"
                name="publishDate"
                value={editingPost.publishDate?.toString().split('T')[0]}
                onChange={handleEditInputChange}
                required
                className="mt-2 block w-full text-lg h-12 bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4 md:flex-1">
              <label className="block text-lg font-medium text-gray-400">
                Tags (comma separated):
              </label>
              <input
                type="text"
                name="tags"
                value={editingPost.tags?.join(', ')}
                onChange={handleEditTagsChange}
                required
                className="mt-2 block text-lg w-full h-12 bg-gray-900 border border-gray-600 rounded-md shadow-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-colors"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 ml-2 rounded-md shadow-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {/* Existing Posts Section */}
      <hr />
      <h2 className="text-2xl md:text-3xl font-semibold mt-5 mb-6 text-teal-300">
        Existing Posts
      </h2>
      <ul className="space-y-6 m-0 md:m-4">
        {posts.map((post) => (
          <li key={post._id} className="bg-gray-800 p-3 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-teal-400 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-400 mb-2">{post.description}</p>
            <p className="text-gray-500 mb-4">
              By {post.author} on
              {new Date(post.publishDate).toLocaleDateString()}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleEditClick(post)}
                className="bg-yellow-500 text-white py-1 px-4 rounded-md shadow-md hover:bg-yellow-600 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(post._id)}
                className="bg-red-500 text-white py-1 px-4 rounded-md shadow-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-60 flex items-center md:m-0 m-2 justify-center overflow-y-auto">
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
              Are you sure you want to delete this blog post?
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
                onClick={() => handleDeletePost(deleteId!)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminPage;
