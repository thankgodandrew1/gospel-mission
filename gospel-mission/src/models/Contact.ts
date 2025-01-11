import mongoose, { Document, Schema, Model, models } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema: Schema<IContact> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
