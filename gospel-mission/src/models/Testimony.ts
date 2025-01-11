import mongoose, { Document, Schema, Model, models } from 'mongoose';

export interface ITestimony extends Document {
  name: string;
  testimony: string;
  imageUrl?: string;
  approved: boolean;
}

const testimonySchema: Schema<ITestimony> = new Schema(
  {
    name: { type: String, required: true },
    testimony: { type: String, required: true },
    imageUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/dqsslvhbj/image/upload/v1735818944/uraixwi3obdrpwlzimdv.ico',
    },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Testimony: Model<ITestimony> =
  models.Testimony || mongoose.model<ITestimony>('Testimony', testimonySchema);

export default Testimony;
