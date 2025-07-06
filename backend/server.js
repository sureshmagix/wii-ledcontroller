const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/api/command', (req, res) => {
  console.log('Received command:', req.body);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
