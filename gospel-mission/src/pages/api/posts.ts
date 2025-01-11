import { connectToDatabase } from ' @/lib/dbConnect';
import Post from ' @/models/Post';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { postId, limit, skip, search } = req.query;
      if (postId) {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({ post });
      } else if (search) {
        const searchQuery = search.toString().toLowerCase();
        const posts = await Post.find({
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { tags: { $regex: searchQuery, $options: 'i' } },
          ],
        });
        return res.status(200).json({ posts });
      } else {
        const limitNumber = parseInt(limit as string) || 12;
        const skipNumber = parseInt(skip as string) || 0;
        const posts = await Post.find().limit(limitNumber).skip(skipNumber);
        return res.status(200).json({ posts });
      }
    } else if (req.method === 'POST') {
      const { title, content, image, author, publishDate, description, tags } =
        req.body;

      if (
        !title ||
        !content ||
        !image ||
        !author ||
        !publishDate ||
        !description ||
        !tags
      ) {
        return res.status(400).json({ error: 'Please fill in all fields' });
      }

      const newPost = new Post({
        title,
        content,
        image,
        author,
        publishDate,
        description,
        tags,
      });
      console.log(newPost);
      const savedPost = await newPost.save();
      return res.status(201).json({ success: true, post: savedPost });
    } else if (req.method === 'PUT') {
      const {
        postId,
        title,
        content,
        image,
        author,
        publishDate,
        description,
        tags,
      } = req.body;

      if (
        !title ||
        !content ||
        !image ||
        !author ||
        !publishDate ||
        !description ||
        !tags
      ) {
        return res.status(400).json({ error: 'Please fill in all fields' });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, content, image, author, publishDate, description, tags },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json({ success: true, post: updatedPost });
    } else if (req.method === 'DELETE') {
      const { postId } = req.query;

      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json({ success: true, post: deletedPost });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
