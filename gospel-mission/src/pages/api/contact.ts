import { connectToDatabase } from ' @/lib/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import Contact from ' @/models/Contact';
import withAuth from ' @/middleware/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { contactId } = req.query;
      if (contactId) {
        const contact = await Contact.findById(contactId);
        if (!contact) {
          return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(200).json({ contact });
      } else {
        const contacts = await Contact.find();
        return res.status(200).json({ contacts });
      }
    } else if (req.method === 'POST') {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all fields' });
      }

      const newContact = new Contact({ name, email, message });
      const savedContact = await newContact.save();
      return res.status(201).json({ success: true, contact: savedContact });
    } else if (req.method === 'DELETE') {
      const { contactId } = req.query;

      const deletedContact = await Contact.findByIdAndDelete(contactId);

      if (!deletedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      return res.status(200).json({ success: true, contact: deletedContact });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default withAuth(handler);
