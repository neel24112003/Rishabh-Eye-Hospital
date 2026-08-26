import fs from 'fs';
import path from 'path';

let cachedReviews = null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    if (cachedReviews && cachedReviews.length > 0) {
      return res.status(200).json(cachedReviews);
    }
    try {
      const filePath = path.join(process.cwd(), 'public', 'reviews_data.json');
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        cachedReviews = JSON.parse(fileData);
        return res.status(200).json(cachedReviews);
      }
    } catch (e) {}
    return res.status(200).json([]);
  }

  if (req.method === 'POST') {
    const { name, location, treatment, doctor, rating, date, text } = req.body || {};
    if (!name || !text) {
      return res.status(400).json({ success: false, message: 'Name and text are required.' });
    }

    if (!cachedReviews) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'reviews_data.json');
        if (fs.existsSync(filePath)) {
          cachedReviews = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } else {
          cachedReviews = [];
        }
      } catch (e) {
        cachedReviews = [];
      }
    }

    const item = {
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

    cachedReviews = [item, ...cachedReviews];
    return res.status(200).json({ success: true, reviews: cachedReviews });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
