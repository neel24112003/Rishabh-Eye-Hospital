import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const GMAIL_USER = process.env.GMAIL_USER || '21amtics441@gmail.com';
const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS || 'ruwrrwmrfieterig';

const createTransporter = (pass) => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: pass.replace(/\s+/g, '')
  }
});

let activeTransporter = createTransporter(GMAIL_APP_PASS);

activeTransporter.verify((error) => {
  if (error) {
    console.error('❌ Gmail Auth Warning:', error.message);
    console.error('👉 Please generate a new 16-character Gmail App Password at: https://myaccount.google.com/apppasswords');
  } else {
    console.log(`✅ Gmail SMTP Authenticated successfully for ${GMAIL_USER} on port 465!`);
  }
});

// Appointment API Endpoint
app.post('/api/book-appointment', async (req, res) => {
  const { name, phone, email, doctor, service, preferredDate, preferredTime, notes } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Patient name and phone number are required.' });
  }

  // 1. Hospital Admin Email Template (Perfect Responsive Alignment & Formatting)
  const adminHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New OPD Appointment Alert</title>
    </head>
    <body style="margin: 0; padding: 20px 10px; background-color: #04070D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #0A101D; border-radius: 20px; border: 1px solid rgba(53, 166, 183, 0.4); overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.6);">
        
        <!-- Header -->
        <tr>
          <td align="center" style="padding: 28px 20px; background: linear-gradient(180deg, #070C14 0%, #0D1627 100%); border-bottom: 2px solid #35A6B7;">
            <div style="font-size: 22px; font-weight: 900; color: #B8ED78; letter-spacing: -0.5px; margin-bottom: 4px;">
              👁️ RISHABH EYECARE HOSPITAL
            </div>
            <div style="font-size: 11px; font-weight: 700; color: #35A6B7; text-transform: uppercase; letter-spacing: 1.5px;">
              Hospital & Laser Center • Surat, Gujarat
            </div>
          </td>
        </tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 24px 20px;">
            
            <!-- Alert Pill Badge -->
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="display: inline-block; background-color: rgba(184, 237, 120, 0.12); color: #B8ED78; border: 1px solid rgba(184, 237, 120, 0.4); padding: 6px 16px; border-radius: 30px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                🚨 NEW OPD APPOINTMENT REQUEST
              </span>
            </div>

            <!-- Details Form Table -->
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 0 8px;">
              
              <tr>
                <td width="35%" style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px; border-left: 3px solid #35A6B7;">
                  Patient Name
                </td>
                <td width="65%" style="padding: 12px 14px; background-color: #060B14; color: #FFFFFF; font-size: 15px; font-weight: 800; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px; border-left: 3px solid #B8ED78;">
                  Phone Number
                </td>
                <td style="padding: 12px 14px; background-color: #060B14; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  <a href="tel:${phone}" style="color: #B8ED78; font-size: 17px; font-weight: 800; text-decoration: none;">
                    📞 ${phone}
                  </a>
                </td>
              </tr>

              ${email ? `
              <tr>
                <td style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px; border-left: 3px solid #51AABC;">
                  Patient Email
                </td>
                <td style="padding: 12px 14px; background-color: #060B14; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  <a href="mailto:${email}" style="color: #51AABC; font-size: 14px; font-weight: 700; text-decoration: none;">
                    ✉️ ${email}
                  </a>
                </td>
              </tr>
              ` : ''}

              <tr>
                <td style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px;">
                  Doctor Choice
                </td>
                <td style="padding: 12px 14px; background-color: #060B14; color: #FFFFFF; font-size: 14px; font-weight: 700; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  ${doctor || 'Dr. Hetalkumar R. Yagnik'}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px;">
                  Required Service
                </td>
                <td style="padding: 12px 14px; background-color: #060B14; color: #35A6B7; font-size: 14px; font-weight: 800; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  ${service || 'Cataract Surgery (Phaco)'}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px;">
                  Preferred Date
                </td>
                <td style="padding: 12px 14px; background-color: #060B14; color: #FFFFFF; font-size: 14px; font-weight: 700; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  📅 ${preferredDate || 'Earliest Available'}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px;">
                  Time Slot
                </td>
                <td style="padding: 12px 14px; background-color: #060B14; color: #FFFFFF; font-size: 14px; font-weight: 700; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  ⏰ ${preferredTime || 'Morning (9:00 AM - 1:00 PM)'}
                </td>
              </tr>

              ${notes ? `
              <tr>
                <td style="padding: 12px 14px; background-color: #060B14; color: #94A3B8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 12px; border-bottom-left-radius: 12px;">
                  Patient Notes
                </td>
                <td style="padding: 12px 14px; background-color: #060B14; color: #CBD5E1; font-size: 13px; font-style: italic; border-top-right-radius: 12px; border-bottom-right-radius: 12px;">
                  "${notes}"
                </td>
              </tr>
              ` : ''}

            </table>

            <!-- Action Button -->
            <div style="margin-top: 24px; text-align: center;">
              <a href="tel:${phone}" style="display: block; width: 100%; box-sizing: border-box; padding: 15px 20px; background: linear-gradient(135deg, #B8ED78 0%, #35A6B7 100%); color: #04070D; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; border-radius: 14px; text-align: center; box-shadow: 0 6px 20px rgba(184, 237, 120, 0.3);">
                📞 Call Patient Directly (${phone})
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding: 18px 20px; background-color: #060B14; border-top: 1px solid #162032; color: #64748B; font-size: 11px;">
            Rishabh Eyecare Hospital Online Booking Engine • Surat, Gujarat
          </td>
        </tr>

      </table>

    </body>
    </html>
  `;

  // 2. Patient Auto-Reply Email Template (100% Pure English Message)
  const patientHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation - Rishabh Eye Hospital</title>
    </head>
    <body style="margin: 0; padding: 20px 10px; background-color: #04070D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #0A101D; border-radius: 20px; border: 1px solid rgba(184, 237, 120, 0.4); overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.6);">
        
        <!-- Header -->
        <tr>
          <td align="center" style="padding: 28px 20px; background: linear-gradient(180deg, #070C14 0%, #0D1627 100%); border-bottom: 2px solid #B8ED78;">
            <div style="font-size: 22px; font-weight: 900; color: #B8ED78; letter-spacing: -0.5px; margin-bottom: 4px;">
              👁️ RISHABH EYECARE HOSPITAL
            </div>
            <div style="font-size: 11px; font-weight: 700; color: #35A6B7; text-transform: uppercase; letter-spacing: 1.5px;">
              Hospital & Laser Center • Surat, Gujarat
            </div>
          </td>
        </tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 28px 24px;">
            
            <div style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 14px;">
              Dear ${name},
            </div>

            <!-- Concise Clear English Message Box -->
            <div style="background-color: rgba(53, 166, 183, 0.12); border-left: 4px solid #B8ED78; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <div style="font-size: 12px; font-weight: 800; color: #B8ED78; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                ⏳ APPOINTMENT REQUEST RECEIVED & UNDER REVIEW
              </div>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #E2E8F0;">
                We have received your appointment request. The Rishabh Eye Hospital medical OPD team is reviewing your requested doctor (<strong>${doctor || 'Dr. Hetalkumar R. Yagnik'}</strong>) and preferred slot (<strong>${preferredDate || 'Earliest Available'} • ${preferredTime || 'Morning'}</strong>) and will contact you via a phone call on <strong style="color: #B8ED78;">${phone}</strong> shortly to confirm your appointment.
              </p>
            </div>

            <!-- Emergency / Immediate Reach Out Note -->
            <div style="background-color: #060B14; border: 1px solid rgba(81, 170, 188, 0.3); border-radius: 14px; padding: 18px; margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 800; color: #35A6B7; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                🚨 For Any Emergency or Immediate Inquiry
              </div>
              <div style="font-size: 14px; color: #FFFFFF; font-weight: 700;">
                Please reach out to our 24/7 Helpline directly: 
                <a href="tel:07405563636" style="color: #B8ED78; text-decoration: none; font-size: 16px; margin-left: 4px;">📞 074055 63636</a>
              </div>
            </div>

            <!-- Perfectly Aligned Booking Summary Table Card -->
            <div style="background-color: #060B14; border: 1px solid rgba(184, 237, 120, 0.3); border-radius: 16px; padding: 20px;">
              <div style="font-size: 12px; font-weight: 800; color: #B8ED78; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px;">
                📋 REQUESTED BOOKING SUMMARY
              </div>
              
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 0 8px;">
                <tr>
                  <td width="38%" style="padding: 10px 12px; background-color: #0B1220; color: #94A3B8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 10px; border-bottom-left-radius: 10px; border-left: 2px solid #35A6B7;">
                    Doctor
                  </td>
                  <td width="62%" style="padding: 10px 12px; background-color: #0B1220; color: #FFFFFF; font-size: 14px; font-weight: 800; border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                    ${doctor || 'Dr. Hetalkumar R. Yagnik'}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 12px; background-color: #0B1220; color: #94A3B8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 10px; border-bottom-left-radius: 10px; border-left: 2px solid #B8ED78;">
                    Service
                  </td>
                  <td style="padding: 10px 12px; background-color: #0B1220; color: #35A6B7; font-size: 14px; font-weight: 800; border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                    ${service || 'Cataract Surgery (Phaco)'}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 12px; background-color: #0B1220; color: #94A3B8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 10px; border-bottom-left-radius: 10px; border-left: 2px solid #51AABC;">
                    Preferred Date
                  </td>
                  <td style="padding: 10px 12px; background-color: #0B1220; color: #FFFFFF; font-size: 14px; font-weight: 800; border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                    📅 ${preferredDate || 'Earliest Available'}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 12px; background-color: #0B1220; color: #94A3B8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-top-left-radius: 10px; border-bottom-left-radius: 10px; border-left: 2px solid #B8ED78;">
                    Time Slot
                  </td>
                  <td style="padding: 10px 12px; background-color: #0B1220; color: #FFFFFF; font-size: 14px; font-weight: 800; border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                    ⏰ ${preferredTime || 'Morning (9:00 AM - 1:00 PM)'}
                  </td>
                </tr>
              </table>
            </div>

          </td>
        </tr>

        <!-- Hospital Location & Footer -->
        <tr>
          <td align="center" style="padding: 20px; background-color: #060B14; border-top: 1px solid #162032; color: #64748B; font-size: 11px; line-height: 1.5;">
            <strong style="color: #94A3B8;">Rishabh Eyecare Hospital & Laser Center</strong><br>
            The Lenora, 201-202, New City Light Rd, Althan, Surat, Gujarat 395007<br>
            24/7 OPD Helpline: 074055 63636
          </td>
        </tr>

      </table>

    </body>
    </html>
  `;

  try {
    // Send email to Hospital Admin
    await activeTransporter.sendMail({
      from: `"Rishabh Eye Hospital" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `🚨 New OPD Appointment Alert: ${name} (${phone})`,
      html: adminHtmlContent
    });

    // Send confirmation email to patient if email provided
    if (email && email.includes('@')) {
      await activeTransporter.sendMail({
        from: `"Rishabh Eye Hospital" <${GMAIL_USER}>`,
        to: email,
        subject: `Appointment Received - Rishabh Eye Hospital, Surat`,
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

// Reviews API Endpoints for Cross-Device Persistence
const REVIEWS_FILE = path.join(process.cwd(), 'public', 'reviews_data.json');

app.get('/api/reviews', (req, res) => {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
      return res.status(200).json(JSON.parse(data));
    }
  } catch (err) {
    console.error('❌ Error reading reviews_data.json:', err);
  }
  return res.status(200).json([]);
});

app.post('/api/reviews', async (req, res) => {
  const { name, location, treatment, doctor, rating, date, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ success: false, message: 'Name and text are required.' });
  }

  const newReview = {
    id: Date.now(),
    name,
    location: location || "Surat Patient",
    treatment: treatment || "Cataract Surgery",
    doctor: doctor || "Dr. Hetalkumar Yagnik",
    rating: Number(rating) || 5,
    date: date || "Just now",
    text,
    verified: true
  };

  try {
    let list = [];
    if (fs.existsSync(REVIEWS_FILE)) {
      const existing = fs.readFileSync(REVIEWS_FILE, 'utf8');
      list = JSON.parse(existing);
    }
    list.unshift(newReview);
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(list, null, 2), 'utf8');

    console.log(`✅ New patient review saved from ${name} across all devices!`);

    // Auto Git Sync to GitHub for Global Permanent Persistence across all devices
    exec('git add public/reviews_data.json && git commit -m "Auto-save patient review" && git push origin main', (err, stdout, stderr) => {
      if (err) {
        console.warn("Git sync notice:", err.message);
      } else {
        console.log("✅ Review synced permanently to GitHub repo!");
      }
    });

    // Notify Hospital Admin via Email about new review
    try {
      await activeTransporter.sendMail({
        from: `"Rishabh Eye Hospital" <${GMAIL_USER}>`,
        to: GMAIL_USER,
        subject: `⭐ New Patient Review Posted by ${name} (${rating} Stars)`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #070C14; color: #fff; border-radius: 10px;">
            <h2 style="color: #B8ED78;">⭐ New Patient Experience Review</h2>
            <p><strong>Patient Name:</strong> ${name}</p>
            <p><strong>Treatment:</strong> ${treatment}</p>
            <p><strong>Rating:</strong> ${'★'.repeat(rating)} (${rating}/5)</p>
            <p><strong>Review:</strong> "${text}"</p>
          </div>
        `
      });
    } catch (e) {
      console.warn("Review email notice error:", e.message);
    }

    return res.status(200).json({ success: true, reviews: list });
  } catch (err) {
    console.error('❌ Error saving review:', err);
    return res.status(500).json({ success: false, message: 'Failed to save review.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Rishabh Eye Hospital Mail & Reviews Server running on port ${PORT}`);
});
