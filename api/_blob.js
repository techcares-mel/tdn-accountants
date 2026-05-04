const { put, list } = require('@vercel/blob');
const jwt = require('jsonwebtoken');

async function readBlob(pathname) {
  const { blobs } = await list({ prefix: pathname, limit: 10 });
  const match = blobs.find(b => b.pathname === pathname);
  if (!match) return null;
  const r = await fetch(match.url, { cache: 'no-store' });
  return r.json();
}

async function writeBlob(pathname, data) {
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) throw new Error('Unauthorized');
  jwt.verify(auth.slice(7), process.env.JWT_SECRET);
}

function corsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
}

module.exports = { readBlob, writeBlob, verifyToken, corsHeaders };
