// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import Contact from '@/lib/models/Contact';
// import nodemailer from 'nodemailer';

// export async function POST(request: Request) {
//   try {
//     await connectDB();
//     const body = await request.json();
//     const { contactId, replyMessage } = body;

//     if (!contactId || !replyMessage) {
//       return NextResponse.json(
//         { error: 'Contact ID and reply message are required' },
//         { status: 400 }
//       );
//     }

//     // Fetch contact details
//     const contact = await Contact.findById(contactId);
//     if (!contact) {
//       return NextResponse.json(
//         { error: 'Contact not found' },
//         { status: 404 }
//       );
//     }

//     // Configure nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER, // Your Gmail address
//         pass: process.env.EMAIL_PASSWORD, // Your Gmail App Password
//       },
//     });

//     // Send email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: contact.email,
//       subject: `Re: Your message from ${contact.name}`,
//       html: `
//         <h2>Thank you for contacting us!</h2>
//         <p>Dear ${contact.name},</p>
//         <p>${replyMessage}</p>
//         <br/>
//         <hr/>
//         <p><strong>Your original message:</strong></p>
//         <p>${contact.message}</p>
//         <br/>
//         <p>Best regards,<br/>Your Portfolio Team</p>
//       `,
//     });

//     // Update contact status to resolved
//     await Contact.findByIdAndUpdate(contactId, { status: 'resolved' });

//     return NextResponse.json({
//       message: 'Email sent successfully and status updated to resolved',
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { error: 'Failed to send email' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/lib/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save to DB
    const contact = await Contact.create({
      name,
      email,
      message,
      status: 'pending',
    });

    // Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email to YOU
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // your gmail
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('CONTACT ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
