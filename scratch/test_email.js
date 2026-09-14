import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER || '21amtics441@gmail.com';
const GMAIL_APP_PASS = (process.env.GMAIL_APP_PASS || 'ruwrrwmrfieterig').replace(/\s+/g, '');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASS
  }
});

async function runTest() {
  console.log('Verifying SMTP connection...');
  await transporter.verify();
  console.log('SMTP connection verified successfully!');

  console.log('Sending test email to hospital and patient...');
  const info = await transporter.sendMail({
    from: `"Rishabh Eye Hospital" <${GMAIL_USER}>`,
    to: [GMAIL_USER, 'rishabheyecare36@gmail.com'].join(','),
    subject: '🧪 Test Email Verification - Rishabh Eye Hospital',
    html: `
      <div style="font-family: sans-serif; padding: 20px; background: #070C14; color: #fff;">
        <h2 style="color: #B8ED78;">Rishabh Eye Hospital Mailer Test</h2>
        <p>This is a live test email sent at ${new Date().toISOString()}</p>
      </div>
    `
  });

  console.log('Email sent successfully:', info.messageId);
}

runTest().catch(err => {
  console.error('Error sending test email:', err);
});
