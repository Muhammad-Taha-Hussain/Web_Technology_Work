// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// const TOKEN = "91e8b3dee57142a87a6b142d87c596ab";

// export const mailtrapClient = new MailtrapClient({
//   endpoint: process.env.MAILTRAP_ENDPOINT,
//   endpoint: "https://send.api.mailtrap.io",
//   token: TOKEN,
//   // token: process.env.MAILTRAP_TOKEN,
// });

// export const sender = {
//   // email: "zahoorqasim327@gmail.com.com",
//   // name: "Burak",
//   email: "hello@example.com",
//   name: "Mailtrap Test",
// };



import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: '0f0301217f7e03', // Your Mailtrap SMTP user
    pass: '788dfcbc33ab9e', // Your Mailtrap SMTP password
  },
});

export const sender = {
  email: "hello@example.com",
  name: "Mailtrap Test",
};
