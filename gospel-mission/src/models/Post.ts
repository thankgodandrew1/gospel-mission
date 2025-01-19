import mongoose, { Document, Schema, Model, models } from 'mongoose';
import { generateUniqueSlug } from ' @/utils/slugUtils';

export interface IPost extends Document {
  _id: string;
  title: string;
  slug: string;
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
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: true },
    description: { type: String, required: true, maxlength: 300 },
    tags: [{ type: String, required: true }],
  },
  { timestamps: true }
);

// Using pre-save middleware to generate the slug from the title
PostSchema.pre('save', async function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = await generateUniqueSlug(this.title);
  }
  next();
});

PostSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<IPost>;
  if (update.title) {
    update.slug = await generateUniqueSlug(update.title);
    this.setUpdate(update);
  }
  next();
});

const Post: Model<IPost> =
  models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
