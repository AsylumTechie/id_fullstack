const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors()); 
app.use(cors({
  origin: 'cosminnox.vercel.app' 

}));

app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
