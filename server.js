import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const APP_PASS = 'bsqoekwpbzqnjaks'; // 16-char app password

const createTransporter = (pass) => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: '21amtics441@gmail.com',
    pass: pass
  }
});

let activeTransporter = createTransporter(APP_PASS);

activeTransporter.verify((error) => {
  if (error) {
    activeTransporter = createTransporter('bsqoekwpbzqnjaksx');
    activeTransporter.verify((err2) => {
      if (err2) console.error('❌ Gmail Auth Warning:', err2.message);
      else console.log('✅ Gmail SMTP Authenticated successfully!');
    });
  } else {
    console.log('✅ Gmail SMTP Authenticated successfully on port 465!');
  }
});

// Appointment API Endpoint
app.post('/api/book-appointment', async (req, res) => {
  const { name, phone, email, doctor, service, preferredDate, preferredTime, notes } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Patient name and phone number are required.' });
  }

  // 1. Hospital Admin Notification Email Template
  const adminHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #070C14; color: #f1f5f9; margin: 0; padding: 20px; }
        .card { max-width: 650px; margin: 0 auto; background: #0E1726; border-radius: 20px; border: 1px solid rgba(53, 166, 183, 0.4); box-shadow: 0 10px 40px rgba(0,0,0,0.5); overflow: hidden; }
        .header { background: linear-gradient(135deg, #070C14 0%, #0E1726 100%); padding: 30px 25px; text-align: center; border-bottom: 2px solid #35A6B7; }
        .logo-title { color: #B8ED78; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }
        .sub-title { color: #35A6B7; font-size: 13px; font-weight: 600; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 30px 25px; }
        .alert-badge { display: inline-block; background: rgba(184, 237, 120, 0.15); color: #B8ED78; border: 1px solid rgba(184, 237, 120, 0.4); padding: 6px 14px; border-radius: 30px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
        .table { width: 100%; border-collapse: separate; border-spacing: 0 10px; }
        .td-label { color: #94a3b8; font-size: 13px; font-weight: 600; padding: 10px 14px; background: rgba(7, 12, 20, 0.6); border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: 140px; }
        .td-val { color: #ffffff; font-size: 15px; font-weight: 700; padding: 10px 14px; background: rgba(7, 12, 20, 0.6); border-top-right-radius: 10px; border-bottom-right-radius: 10px; }
        .highlight-phone { color: #B8ED78 !important; font-size: 17px !important; text-decoration: none; }
        .highlight-service { color: #35A6B7 !important; }
        .action-btns { margin-top: 25px; display: flex; gap: 12px; }
        .btn-call { flex: 1; display: inline-block; text-align: center; background: linear-gradient(135deg, #B8ED78 0%, #35A6B7 100%); color: #070C14; font-weight: 800; font-size: 13px; text-transform: uppercase; padding: 12px 20px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(184,237,120,0.3); }
        .btn-whatsapp { flex: 1; display: inline-block; text-align: center; background: #25D366; color: #ffffff; font-weight: 800; font-size: 13px; text-transform: uppercase; padding: 12px 20px; border-radius: 12px; text-decoration: none; }
        .footer { background: #070C14; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="logo-title">👁️ RISHABH EYECARE HOSPITAL</h1>
          <div class="sub-title">& Laser Center • Surat, Gujarat</div>
        </div>
        <div class="content">
          <div class="alert-badge">🚨 New OPD Appointment Alert</div>
          
          <table class="table">
            <tr>
              <td class="td-label">Patient Name</td>
              <td class="td-val">${name}</td>
            </tr>
            <tr>
              <td class="td-label">Phone Number</td>
              <td class="td-val"><a href="tel:${phone}" class="highlight-phone">📞 ${phone}</a></td>
            </tr>
            ${email ? `
            <tr>
              <td class="td-label">Patient Email</td>
              <td class="td-val" style="color:#51AABC;">${email}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="td-label">Doctor Choice</td>
              <td class="td-val">${doctor || 'Dr. Hetalkumar R. Yagnik'}</td>
            </tr>
            <tr>
              <td class="td-label">Required Service</td>
              <td class="td-val highlight-service">${service || 'Cataract Surgery (Phaco)'}</td>
            </tr>
            <tr>
              <td class="td-label">Preferred Date</td>
              <td class="td-val">${preferredDate || 'Earliest Available'}</td>
            </tr>
            <tr>
              <td class="td-label">Time Slot</td>
              <td class="td-val">${preferredTime || 'Morning'}</td>
            </tr>
            ${notes ? `
            <tr>
              <td class="td-label">Patient Notes</td>
              <td class="td-val" style="font-weight:400; font-style:italic; color:#cbd5e1;">"${notes}"</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 25px;">
            <a href="tel:${phone}" class="btn-call">📞 Call Patient Directly</a>
          </div>
        </div>
        <div class="footer">
          Received via Rishabh Eye Hospital Online Booking Engine • Surat, Gujarat
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. Patient Confirmation Email Template
  const patientHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #070C14; color: #f1f5f9; margin: 0; padding: 20px; }
        .card { max-width: 650px; margin: 0 auto; background: #0E1726; border-radius: 20px; border: 1px solid rgba(184, 237, 120, 0.4); box-shadow: 0 10px 40px rgba(0,0,0,0.5); overflow: hidden; }
        .header { background: linear-gradient(135deg, #070C14 0%, #0E1726 100%); padding: 30px 25px; text-align: center; border-bottom: 2px solid #B8ED78; }
        .logo-title { color: #B8ED78; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }
        .sub-title { color: #35A6B7; font-size: 13px; font-weight: 600; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 30px 25px; }
        .welcome-title { font-size: 20px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 12px; }
        .status-box { background: rgba(53, 166, 183, 0.15); border: 1px solid #35A6B7; border-left: 4px solid #B8ED78; padding: 16px; border-radius: 12px; margin: 20px 0; }
        .status-title { font-size: 14px; font-weight: 700; color: #B8ED78; margin: 0 0 6px 0; text-transform: uppercase; }
        .status-desc { font-size: 13px; color: #e2e8f0; margin: 0; leading-height: 1.5; }
        .hospital-info { background: rgba(7, 12, 20, 0.8); border: 1px solid #1e293b; padding: 20px; border-radius: 14px; margin-top: 25px; }
        .hospital-info h4 { color: #35A6B7; margin-top: 0; margin-bottom: 10px; font-size: 15px; }
        .info-item { font-size: 13px; color: #cbd5e1; margin-bottom: 6px; }
        .footer { background: #070C14; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="logo-title">👁️ RISHABH EYECARE HOSPITAL</h1>
          <div class="sub-title">Hospital & Laser Center • Surat</div>
        </div>
        <div class="content">
          <div class="welcome-title">Dear ${name},</div>
          <p style="font-size:14px; color:#cbd5e1; line-height:1.6; margin-top:0;">
            Thank you for choosing <strong>Rishabh Eye Hospital & Laser Center, Surat</strong>. We have successfully received your appointment request.
          </p>

          <div class="status-box">
            <div class="status-title">⏳ Appointment Request Received & Under Review</div>
            <p class="status-desc">
              Humne aapka appointment request receive kar liya hai. Hamari medical OPD team aapke requested doctor (<strong>${doctor}</strong>) aur requested slot (<strong>${preferredDate || 'Upcoming Date'} - ${preferredTime}</strong>) ko check karke aapko <strong>${phone}</strong> par call karke appointment confirm karegi.
            </p>
          </div>

          <div class="hospital-info">
            <h4>🏥 Rishabh Eye Hospital & Laser Center Details</h4>
            <div class="info-item">📍 <strong>Address:</strong> The Lenora, 201-202, New City Light Rd, beside Naveli Hospital, Althan, Surat, Gujarat 395007</div>
            <div class="info-item">📞 <strong>24/7 OPD Helpline:</strong> 074055 63636</div>
            <div class="info-item">👨‍⚕️ <strong>Senior Super-Consultant:</strong> Dr. Hetalkumar R. Yagnik (17+ Years Experience)</div>
            <div class="info-item">👩‍⚕️ <strong>Consultant Surgeon:</strong> Dr. Shefali H. Yagnik</div>
            <div class="info-item">⭐ <strong>Facilities:</strong> German Modular OT, American Phaco Cataract System, Bladeless LASIK, In-House Optical Shop.</div>
          </div>
        </div>
        <div class="footer">
          Rishabh Eyecare Hospital & Laser Center • Althan, Surat, Gujarat 395007 • 074055 63636
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send email to Hospital Admin
    await activeTransporter.sendMail({
      from: '"Rishabh Eye Hospital" <21amtics441@gmail.com>',
      to: '21amtics441@gmail.com',
      subject: `🚨 New Appointment Alert: ${name} (${phone}) - ${service || 'Consultation'}`,
      html: adminHtmlContent
    });

    // Send confirmation email to patient if email provided
    if (email && email.includes('@')) {
      await activeTransporter.sendMail({
        from: '"Rishabh Eye Hospital" <21amtics441@gmail.com>',
        to: email,
        subject: `Appointment Request Received - Rishabh Eye Hospital, Surat`,
        html: patientHtmlContent
      });
    }

    console.log(`✅ Appointment email dispatched successfully for ${name} (${phone})`);
    return res.status(200).json({ success: true, message: 'Appointment emails sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending appointment email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email notification.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Rishabh Eye Hospital Mail API Server running on port ${PORT}`);
});
