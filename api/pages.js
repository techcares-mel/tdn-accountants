const { readBlob, writeBlob, verifyToken, corsHeaders } = require('./_blob');

module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const pages = (await readBlob('pages.json')) || [];
      let isAdmin = false;
      try { verifyToken(req); isAdmin = true; } catch {}
      return res.status(200).json(isAdmin ? pages : pages.filter(p => p.published));
    } catch {
      return res.status(200).json([]);
    }
  }

  if (req.method === 'POST') {
    try { verifyToken(req); } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const page = req.body;
      if (!page || !page.slug) return res.status(400).json({ error: 'Page must have a slug' });
      const pages = (await readBlob('pages.json').catch(() => null)) || [];
      const idx = pages.findIndex(p => p.slug === page.slug);
      if (idx >= 0) pages[idx] = page;
      else pages.unshift(page);
      await writeBlob('pages.json', pages);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Pages write error:', err);
      return res.status(500).json({ error: 'Failed to save page' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
