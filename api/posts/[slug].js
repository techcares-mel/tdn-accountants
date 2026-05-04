const { readBlob, writeBlob, verifyToken, corsHeaders } = require('../_blob');

module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const posts = (await readBlob('posts.json')) || [];
      let isAdmin = false;
      try { verifyToken(req); isAdmin = true; } catch {}
      const post = posts.find(p => p.slug === slug && (isAdmin || p.published));
      if (!post) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(post);
    } catch {
      return res.status(404).json({ error: 'Not found' });
    }
  }

  if (req.method === 'DELETE') {
    try { verifyToken(req); } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const posts = (await readBlob('posts.json')) || [];
      await writeBlob('posts.json', posts.filter(p => p.slug !== slug));
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Post delete error:', err);
      return res.status(500).json({ error: 'Failed to delete post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
