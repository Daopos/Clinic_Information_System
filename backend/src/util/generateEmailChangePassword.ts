import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  secure: true,
  port: 465,
});

export const sendEmailChangePassword = async (
  email: string,
  resetUrl: string
): Promise<void> => {
  await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #0047ab;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You recently requested to reset your account password.</p>
        <p>Please click the button below to reset your password:</p>
        <a href="${resetUrl}" 
           style="display:inline-block; padding:12px 20px; color:#fff; background:#0047ab; text-decoration:none; border-radius:5px; font-weight:bold;">
          Reset Password
        </a>
        <p style="margin-top:15px;">Or copy and paste this link into your browser:</p>
        <p style="word-break:break-all; color:#0047ab;">${resetUrl}</p>
        <br/>
        <p>If you did not request this, you can safely ignore this email.</p>
        <p>Thank you,<br/>The Support Team</p>
      </div>
    `,
  });
};
