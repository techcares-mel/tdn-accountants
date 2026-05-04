const { readBlob, writeBlob, verifyToken, corsHeaders } = require('./_blob');

module.exports = async function handler(req, res) {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const posts = (await readBlob('posts.json')) || [];
      let isAdmin = false;
      try { verifyToken(req); isAdmin = true; } catch {}
      return res.status(200).json(isAdmin ? posts : posts.filter(p => p.published));
    } catch {
      return res.status(200).json([]);
    }
  }

  if (req.method === 'POST') {
    try { verifyToken(req); } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const post = req.body;
      if (!post || !post.slug) return res.status(400).json({ error: 'Post must have a slug' });
      const posts = (await readBlob('posts.json').catch(() => null)) || [];
      const idx = posts.findIndex(p => p.slug === post.slug);
      if (idx >= 0) posts[idx] = post;
      else posts.unshift(post);
      await writeBlob('posts.json', posts);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Posts write error:', err);
      return res.status(500).json({ error: 'Failed to save post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
