import { connectToDatabase } from ' @/lib/dbConnect';
import Subscriber from ' @/models/Subscriber';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { token } = req.query;

      if (!token) {
        console.error('Unsubscribe token is missing.');
        return res
          .status(400)
          .json({ error: 'Unsubscribe token is required.' });
      }

      console.log('Token received:', token);
      const subscriber = await Subscriber.findOne({ unsubscribeToken: token });
      if (!subscriber) {
        console.error('Invalid or expired token:', token);
        return res
          .status(404)
          .json({ error: 'Invalid or expired unsubscribe token.' });
      }

      console.log(`Unsubscribing ${subscriber.email}`);
      await Subscriber.deleteOne({ _id: subscriber._id });

      return res.status(200).send(`
        <div style="text-align: center; font-family: 'Roboto', sans-serif; padding: 20px; background: #1f1f1f; color: #f5f5f5; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
            <h2 style="font-size: 24px; font-weight: 700; color: #00b894; text-transform: uppercase; letter-spacing: 1.5px;">You have been unsubscribed.</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #dfe6e9;">We’re sorry to see you go. If this was a mistake, feel free to subscribe again!</p>
            <a href="https://example.com/re-subscribe" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; text-transform: uppercase; color: #1f1f1f; background: #00b894; border: none; border-radius: 5px; text-decoration: none; box-shadow: 0 3px 10px rgba(0,0,0,0.2);">Re-subscribe</a>
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
