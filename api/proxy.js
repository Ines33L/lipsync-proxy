module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const BASE = 'https://inselacaill334-lipsync-v2.hf.space';

  // Étape 2 : polling du résultat
  if (req.method === 'GET' && req.query.event_id) {
    const poll = await fetch(`${BASE}/gradio_api/call/lipsync/${req.query.event_id}`);
    const text = await poll.text();
    return res.status(200).send(text);
  }

  // Étape 1 : lancer la génération
  if (req.method === 'POST') {
    try {
      const response = await fetch(`${BASE}/gradio_api/call/lipsync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
