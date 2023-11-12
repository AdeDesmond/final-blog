import nodemailer from "nodemailer";
import { User } from "../models/userModels";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create hashtoken
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    //
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 360000 },
        { new: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: Date.now() + 360000,
        },
        { new: true }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0bd918ba8a2a88",
        pass: "dffd6f99725196",
      },
    });
    const routeNames = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const mailOptions = {
      from: "test2@email.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify password" : "reset your password",
      html: `<p> Click <a href="http://localhost:3000/${routeNames}?token=${hashToken}">here </a> to ${
        emailType === "verify" ? "verify your email" : "reset your password"
      } </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log(error.message);
  }
};
