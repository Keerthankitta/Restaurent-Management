const MenuItem = require('../models/MenuItem');

exports.getMenu = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};

exports.addMenuItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.json(item);
};
