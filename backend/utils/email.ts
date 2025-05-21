import nodemailer from "nodemailer"
import { env } from "@/config/envConfig"

interface EmailOptions {
    email: string
    subject: string
    message: string
}

export const sendEmail = async (options: EmailOptions) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
        },
    })

    // 2) Define the email options
    const mailOptions = {
        from: env.SMTP_FROM,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    // 3) Actually send the email
    await transporter.sendMail(mailOptions)
} 