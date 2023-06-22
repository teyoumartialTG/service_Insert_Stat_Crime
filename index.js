require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 7000;
const statRoutes = require('./routes/stat');

// database connection
require('./config/database');

app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/stat', statRoutes);

// server running status
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The app listening at http://localhost: ${PORT}`);
});
