import { connectToDatabase } from ' @/lib/dbConnect';
import Post from ' @/models/Post';
import { NextApiRequest, NextApiResponse } from 'next';
import withAuth from ' @/middleware/withAuth';
import nodemailer from 'nodemailer';
import Subscriber from ' @/models/Subscriber';
import { generateUniqueSlug } from ' @/utils/slugUtils';

interface Post {
  title: string;
  description: string;
  _id: string;
  slug: string;
  image: string;
  author: string;
}

const notifySubscribers = async (post: Post) => {
  const subscribers = await Subscriber.find();
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const subscriber of subscribers) {
    const unsubscribeLink = `https://gospel-mission.vercel.app/api/unsubscribe?token=${subscriber.unsubscribeToken}`;
    await transporter.sendMail({
      from: '"Elder Andrew Blog" <your-email@gmail.com>',
      to: subscriber.email,
      subject: `New Post: ${post.title}`,
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h1 style="color: #4a4a4a; text-align: center;">${post.title}</h1>
          ${
            post.image
              ? `<img src="${post.image}" alt="${post.title}" style="display: block; margin: 20px auto; max-width: 100%; height: auto; border-radius: 8px;" />`
              : ''
          }
          <p style="margin-top: 20px;">${post.description}</p>
          <p style="margin-top: 20px; font-style: italic; color: #555;">Written by: <strong>${post.author}</strong></p>
          <a href="https://gospel-mission.vercel.app/post/${post.slug}" 
             style="display: inline-block; margin-top: 20px; background-color: #2980b9; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; text-align: center; font-weight: bold; font-family: 'Roboto', Arial, sans-serif;">
            Read More
          </a>
          <footer style="margin-top: 30px; font-size: 12px; text-align: center; color: #999;">
            You are receiving this email because you subscribed to Elder Andrew Blog. If you wish to unsubscribe, click <a href="${unsubscribeLink}" style="color: #4CAF50;">here</a>.
          </footer>
        </div>
      `,
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { postId, limit, skip, search } = req.query;

      if (postId) {
        const post = await Post.findOne({ slug: postId });
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
        }).sort({ createdAt: -1 });
        return res.status(200).json({ posts });
      } else {
        const limitNumber = parseInt(limit as string) || 12;
        const skipNumber = parseInt(skip as string) || 0;
        const posts = await Post.find()
          .limit(limitNumber)
          .skip(skipNumber)
          .sort({ createdAt: -1 });
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

      const slug = await generateUniqueSlug(title);

      if (!slug) {
        return res
          .status(400)
          .json({ error: 'Slug generation failed. Check the title field.' });
      }

      const newPost = new Post({
        title,
        content,
        image,
        author,
        publishDate,
        description,
        tags,
        slug,
      });

      const savedPost = await newPost.save();
      // console.log('Generated Slug:', slug);
      // console.log('New Post Before Save:', newPost);

      await notifySubscribers(savedPost);
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

      const slug = await generateUniqueSlug(title);

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, content, image, author, publishDate, description, tags, slug },
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
};

export default withAuth(handler);
