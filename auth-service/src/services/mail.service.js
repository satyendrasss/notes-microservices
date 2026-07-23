import nodemailer from "nodemailer";
import { forgotPasswordTemplate } from "../templates/forgotPassword.template.js";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendResetPasswordEmail = async (email, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Reset Your Password",
            html: forgotPasswordTemplate(resetUrl),
        });
    } catch (error) {
        console.error("Failed to send password reset email:", error);
        throw new Error("Unable to send password reset email. Please try again later.");
    }
};