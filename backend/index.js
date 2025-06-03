const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Enable CORS for frontend origin
app.use(cors({
  origin: 'https://charging-station-app-2nfy.vercel.app', // your frontend URL
  credentials: true, // if you want to send cookies/auth headers
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);

app.get('/', (req, res) => {
  res.send('backend is running...');
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
