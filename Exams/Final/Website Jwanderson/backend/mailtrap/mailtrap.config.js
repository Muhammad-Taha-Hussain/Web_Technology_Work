
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();  // Load .env file

export const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sender = {
  email: process.env.SENDER_EMAIL,
  name: process.env.SENDER_NAME,
};
