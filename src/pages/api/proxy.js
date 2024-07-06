// pages/api/proxy.js
export default async function handler(req, res) {
    const url = 'https://bold-fe-api.vercel.app/api';
  
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    if (req.method !== 'GET' && req.body) {
      options.body = JSON.stringify(req.body);
    }
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from external API' });
    }
  }
  