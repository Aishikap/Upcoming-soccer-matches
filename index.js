const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = 'c1fee8a44a9a4582b0f0764a90b55697';

app.get('/api/upcoming-matches', async (req, res) => {
  const today = new Date();
  const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

  const dateFrom = today.toISOString().split('T')[0];
  const dateTo = futureDate.toISOString().split('T')[0];

  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': API_KEY
      },
      params: {
        dateFrom,
        dateTo
      }
    });
    res.json(response.data.matches);
  } catch (error) {
    console.error('Error fetching from Football-Data.org:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
