import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER || 'rishabheyecare36@gmail.com';
const GMAIL_APP_PASS = (process.env.GMAIL_APP_PASS || 'cxkwqltrougxcwvo').replace(/\s+/g, '');

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
  console.log(`Verifying Gmail SMTP connection for ${GMAIL_USER}...`);
  await transporter.verify();
  console.log('✅ Gmail SMTP connection verified successfully!');

  console.log(`Sending trial sample email to ${GMAIL_USER}...`);
  const info = await transporter.sendMail({
    from: `"Rishabh Eye Hospital" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    subject: '🚨 New OPD Appointment Alert (Trial Sample Test) - Rishabh Eye Hospital',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>New OPD Appointment Alert Sample</title>
      </head>
      <body style="margin: 0; padding: 20px 10px; background-color: #04070D; font-family: sans-serif;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #0A101D; border-radius: 20px; border: 1px solid rgba(53, 166, 183, 0.4); overflow: hidden;">
          <tr>
            <td align="center" style="padding: 24px; background: #070C14; border-bottom: 2px solid #35A6B7;">
              <div style="font-size: 22px; font-weight: 900; color: #B8ED78;">👁️ RISHABH EYECARE HOSPITAL</div>
              <div style="font-size: 11px; color: #35A6B7; font-weight: 700; text-transform: uppercase;">Hospital & Laser Center • Surat, Gujarat</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="background: rgba(184, 237, 120, 0.15); color: #B8ED78; border: 1px solid #B8ED78; padding: 6px 16px; border-radius: 30px; font-size: 11px; font-weight: 800;">
                  ✅ GMAIL SMTP LIVE TRIAL SAMPLE
                </span>
              </div>
              <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">
                This is a trial sample appointment alert test sent using your updated email ID <strong>${GMAIL_USER}</strong> and App Password.
              </p>
              <div style="background: #060B14; padding: 16px; border-radius: 12px; color: #fff; margin-top: 16px;">
                <p style="margin: 4px 0;"><strong>Patient Name:</strong> Test Patient</p>
                <p style="margin: 4px 0;"><strong>Phone:</strong> 98250 12345</p>
                <p style="margin: 4px 0;"><strong>Doctor:</strong> Dr. Hetalkumar R. Yagnik</p>
                <p style="margin: 4px 0;"><strong>Service:</strong> Cataract Surgery (Phaco)</p>
                <p style="margin: 4px 0;"><strong>Date & Time:</strong> 16/09/2026 • Morning (9:00 AM - 1:00 PM)</p>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 16px; background: #060B14; color: #64748B; font-size: 11px;">
              Rishabh Eyecare Hospital Online Booking Engine • Live Credentials Verified
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  });

  console.log('✅ Trial Sample Email dispatched successfully! Message ID:', info.messageId);
}

runTest().catch(err => {
  console.error('❌ Error sending trial email:', err);
  process.exit(1);
});
