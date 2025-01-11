import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, File, Files } from 'formidable';
import cloudinary from '../../../cloudinaryConfig';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err: Error, fields: Fields, files: Files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing the files' });
        return;
      }

      const fileArray = files.file as File[];

      if (Array.isArray(fileArray) && fileArray.length > 0) {
        const filePath = fileArray[0].filepath;
        try {
          const uploadResponse = await cloudinary.uploader.upload(filePath, {
            upload_preset: 'ml_default',
          });
          res.status(200).json({ url: uploadResponse.secure_url });
          fs.unlinkSync(filePath);
        } catch (uploadError) {
          console.error(uploadError);
          res
            .status(500)
            .json({ error: 'Something went wrong uploading the image' });
        }
      } else {
        res.status(400).json({ error: 'No file uploaded' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
