const express = require('express');
const sequelize = require('./config/db');
const cors = require('cors');
const adRoutes = require('./routes/adRoutes');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const Ad = require('./models/Ad');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', adRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
