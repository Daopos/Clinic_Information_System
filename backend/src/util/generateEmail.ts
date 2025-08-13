import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MY_EMAIL, // your email
    pass: process.env.EMAIL_APP_PASSWORD, // the app password you generated, paste without spaces
  },
  secure: true,
  port: 465,
});

export const sendEmailPassword = async (
  email: string,
  password: string
): Promise<void> => {
  await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Please change you password later",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #0047ab;">Your Temporary Password</h2>
        <p>Hello,</p>
        <p>Your account password has been set to the temporary password below:</p>
        <p style="font-size: 1.2em; font-weight: bold; background: #f4f4f4; padding: 10px; border-radius: 5px; width: fit-content;">
          ${password}
        </p>
        <p>
          For your security, please <strong>change this password as soon as possible</strong> after logging in.
        </p>
        <p>
          If you did not request this, please contact support immediately.
        </p>
        <br />
        <p>Thank you,<br/>The Support Team</p>
      </div>
    `,
  });
};
