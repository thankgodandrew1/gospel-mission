import mongoose from 'mongoose';
import crypto from 'crypto';

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  unsubscribeToken: { type: String, default: () => crypto.randomBytes(20).toString('hex') },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Subscriber ||
  mongoose.model('Subscriber', SubscriberSchema);
