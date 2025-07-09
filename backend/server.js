const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ ROUTES
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');

app.use('/api/auth', authRoutes);     // login/register
app.use('/api/menu', menuRoutes);     // get/add menu items

// ✅ MongoDB connection + Admin auto-creation
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant')
  .then(async () => {
    console.log('✅ MongoDB connected');

    // ⬇️ Auto-create admin user if not exists
    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin created: admin@example.com / admin123');
    } else {
      console.log('ℹ️ Admin already exists');
    }

    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
