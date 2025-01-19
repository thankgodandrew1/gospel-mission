import { connectToDatabase } from ' @/lib/dbConnect';
import Subscriber from ' @/models/Subscriber';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ error: 'Unsubscribe token is required.' });
      }

      const subscriber = await Subscriber.findOne({ unsubscribeToken: token });
      if (!subscriber) {
        return res.status(404).json({ error: 'Invalid or expired unsubscribe token.' });
      }

      await Subscriber.deleteOne({ _id: subscriber._id });
      return res.status(200).send(`
        <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
          <h2>You have been unsubscribed.</h2>
          <p>We're sorry to see you go. If this was a mistake, feel free to subscribe again!</p>
        </div>
      `);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error during unsubscribe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
