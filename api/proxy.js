export default async function handler(req, res) {
  // Allow all origins (fixes CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const HF_ENDPOINTS = {
    latentsync: 'https://fffiloni-latentsync.hf.space/run/predict',
    sadtalker:  'https://vinthony-sadtalker.hf.space/run/predict',
  };

  // Choose endpoint via query param: /api/proxy?model=sadtalker (default: latentsync)
  const model = req.query.model || 'latentsync';
  const endpoint = HF_ENDPOINTS[model] || HF_ENDPOINTS.latentsync;

  try {
    console.log(`[proxy] Forwarding to ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    console.error('[proxy] Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
