const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/authMiddleware'); // ✅ this matches your file name

// ✅ Example route: add menu item only by admin
router.post('/add-item', verifyAdmin, (req, res) => {
  // Add item logic here
  res.json({ message: 'Item added successfully (admin only)' });
});

module.exports = router;
