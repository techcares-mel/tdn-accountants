const { put, list } = require('@vercel/blob');
const { verifyToken, corsHeaders } = require('./_blob');

module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try { verifyToken(req); } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: 'media/' });
      return res.status(200).json(
        blobs.map(b => ({ url: b.url, pathname: b.pathname, size: b.size }))
      );
    } catch (err) {
      console.error('Media list error:', err);
      return res.status(500).json({ error: 'Failed to list media' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { filename, contentType, data } = req.body || {};
      if (!filename || !data) return res.status(400).json({ error: 'Missing filename or data' });

      const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
      if (!allowed.includes(contentType)) {
        return res.status(400).json({ error: 'Only image files are allowed' });
      }

      const buffer = Buffer.from(data, 'base64');
      if (buffer.length > 3 * 1024 * 1024) {
        return res.status(400).json({ error: 'File too large (max 3MB)' });
      }

      const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const blob = await put(`media/${safe}`, buffer, {
        access: 'public',
        addRandomSuffix: true,
        contentType: contentType,
      });

      return res.status(200).json({ url: blob.url });
    } catch (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
