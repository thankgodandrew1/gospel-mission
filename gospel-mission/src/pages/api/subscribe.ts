import { connectToDatabase } from ' @/lib/dbConnect';
import Subscriber from ' @/models/Subscriber';
import { NextApiRequest, NextApiResponse } from 'next';
import withAuth from ' @/middleware/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: 'Email is required' });

      await connectToDatabase();
      const existingSubscriber = await Subscriber.findOne({ email });
      if (existingSubscriber)
        return res.status(400).json({ error: 'Email already subscribed' });

      const subscriber = new Subscriber({ email });
      await subscriber.save();
      res.status(201).json({ message: 'Successfully subscribed!' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default withAuth(handler);
