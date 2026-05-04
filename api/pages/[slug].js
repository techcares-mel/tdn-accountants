const { readBlob, writeBlob, verifyToken, corsHeaders } = require('../_blob');

module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const pages = (await readBlob('pages.json')) || [];
      let isAdmin = false;
      try { verifyToken(req); isAdmin = true; } catch {}
      const page = pages.find(p => p.slug === slug && (isAdmin || p.published));
      if (!page) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(page);
    } catch {
      return res.status(404).json({ error: 'Not found' });
    }
  }

  if (req.method === 'DELETE') {
    try { verifyToken(req); } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const pages = (await readBlob('pages.json')) || [];
      await writeBlob('pages.json', pages.filter(p => p.slug !== slug));
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Page delete error:', err);
      return res.status(500).json({ error: 'Failed to delete page' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
