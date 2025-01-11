import axios from 'axios';
import { IPost } from ' @/models/Post';

export const fetchBlogPosts = async (): Promise<IPost[]> => {
  try {
    const response = await axios.get('/api/posts');
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};
