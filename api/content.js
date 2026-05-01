const { kv } = require('@vercel/kv');
const jwt = require('jsonwebtoken');

const DEFAULT_CONTENT = {
  hero: {
    badge: '★ Trusted by 500+ Australian businesses',
    h1_line1: 'Your Finances,',
    h1_line2: 'Handled with',
    h1_gradient: 'Precision.',
    subheading: 'Expert accounting, tax strategy, and advisory — built for Australian businesses that want to grow.',
    trust: ['No lock-in contracts', 'Free first consultation', '15+ years experience']
  },
  stats: [
    { target: 500, prefix: '',  suffix: '+',  label: 'Clients Served' },
    { target: 50,  prefix: '$', suffix: 'M+', label: 'Taxes Saved' },
    { target: 15,  prefix: '',  suffix: '+',  label: 'Years Experience' },
    { target: 98,  prefix: '',  suffix: '%',  label: 'Client Retention' }
  ],
  testimonials: [
    {
      quote: 'TDN completely transformed how we handle our finances. We went from dreading tax time to feeling totally on top of it. Our advisor knows our business inside out.',
      name: 'Michael R.',
      business: 'Retail — Melbourne',
      initials: 'MR'
    },
    {
      quote: 'Switched to TDN two years ago and haven\'t looked back. They saved us over $30K in the first year alone through smarter tax planning. Absolute professionals.',
      name: 'Sarah C.',
      business: 'Construction — Footscray',
      initials: 'SC'
    },
    {
      quote: 'The real-time reporting alone is worth it. I can see exactly where my money is at any time. TDN made accounting actually useful for running my business.',
      name: 'David L.',
      business: 'Hospitality — Williamstown',
      initials: 'DL'
    }
  ],
  pricing: [
    {
      tier: 'Starter',
      price: '$299',
      suffix: '/mo',
      desc: 'Perfect for sole traders and small businesses getting started.',
      features: ['Monthly bookkeeping', 'BAS lodgement', 'Annual tax return', 'Email support'],
      excluded: ['Payroll management', 'Business advisory'],
      featured: false
    },
    {
      tier: 'Growth',
      price: '$599',
      suffix: '/mo',
      desc: 'For growing businesses that need full financial support.',
      features: ['Weekly bookkeeping', 'BAS & IAS lodgement', 'Tax planning & return', 'Payroll (up to 10 staff)', 'Quarterly advisory', 'Priority support'],
      excluded: [],
      featured: true
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      suffix: '',
      desc: 'Tailored solutions for larger businesses and complex structures.',
      features: ['Everything in Growth', 'SMSF management', 'Unlimited payroll', 'Monthly advisory', 'CFO-level reporting', 'Dedicated account team'],
      excluded: [],
      featured: false
    }
  ],
  cta: {
    heading: 'Be financially unstoppable.',
    subtext: 'Join 500+ Australian businesses who trust TDN Accountants & Advisers to handle their numbers.',
    button: 'Book a Free Consultation'
  },
  footer: {
    tagline: 'Trusted accounting, tax and advisory services for Australian businesses since 2009.',
    address: 'Level 1, 73 Nicholson Street\nFootscray, Victoria 3011, AU'
  }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const content = await kv.get('content');
      return res.status(200).json(content || DEFAULT_CONTENT);
    } catch {
      return res.status(200).json(DEFAULT_CONTENT);
    }
  }

  if (req.method === 'POST') {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    try {
      const content = req.body;
      if (!content || typeof content !== 'object') {
        return res.status(400).json({ error: 'Invalid content body' });
      }
      await kv.set('content', content);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('KV write error:', err);
      return res.status(500).json({ error: 'Failed to save content' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
