import { connectToDatabase } from ' @/lib/dbConnect';
import Testimony from ' @/models/Testimony';
import { NextApiRequest, NextApiResponse } from 'next';
import withAuth from ' @/middleware/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { approved, skip = 0, limit = 15 } = req.query;
  const filter = approved ? { approved: true } : {};
  const testimonies = await Testimony.find(filter)
    .skip(parseInt(skip as string))
    .limit(parseInt(limit as string))
    .exec();
  res.status(200).json({ testimonies });
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, testimony, imageUrl } = req.body;
  const newTestimony = new Testimony({ name, testimony, imageUrl });
  await newTestimony.save();
  res.status(201).json({ success: true, testimony: newTestimony });
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, approved } = req.body;
  const testimony = await Testimony.findByIdAndUpdate(
    id,
    { approved },
    { new: true }
  ).exec();
  res.status(200).json({ success: true, testimony });
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await Testimony.findByIdAndDelete(id as string).exec();
  res.status(200).json({ success: true });
};

export default withAuth(handler);
