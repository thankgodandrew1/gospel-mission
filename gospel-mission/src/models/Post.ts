import mongoose, { Document, Schema, Model, models } from 'mongoose';

export interface IPost extends Document {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  publishDate: Date;
  description: string;
  tags: string[];
}

const PostSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: true },
    description: { type: String, required: true, maxlength: 300 },
    tags: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
