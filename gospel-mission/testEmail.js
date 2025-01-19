import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testEmail = async () => {
  //     console.log('EMAIL_USER:', process.env.EMAIL_USER); // Should log your email
  // console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded' : 'Not Loaded');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log('Email configuration is valid!');
  } catch (error) {
    console.error('Error validating email configuration:', error);
  }
};

testEmail();
