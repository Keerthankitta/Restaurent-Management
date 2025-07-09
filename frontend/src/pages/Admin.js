// src/pages/AdminAdd.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AdminAdd = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // 🔒 Redirect to login if not logged in
    } else {
      fetchMenu(); // ✅ Only fetch menu if logged in
    }
  }, [navigate]);

  // ✅ Fetch all menu items
  const fetchMenu = async () => {
    try {
      const res = await API.get('/menu');
      setItems(res.data);
    } catch (err) {
      console.error('Fetch menu error:', err);
    }
  };

  // ✅ Add new menu item
  const handleAdd = async () => {
    try {
      await API.post('/menu/add', { name, price, description });
      alert('Item added!');
      setName('');
      setPrice('');
      setDescription('');
      fetchMenu(); // 🔄 Refresh after adding
    } catch (err) {
      console.error('Add item error:', err);
      alert('Failed to add item');
    }
  };

  // ✅ Delete menu item
  const handleDelete = async (id) => {
    try {
      await API.delete(`/menu/${id}`);
      alert('Item deleted!');
      fetchMenu(); // 🔄 Refresh after deletion
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete item');
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // 🔁 Redirect to login page
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Admin Panel</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      
      <h3>Add Menu Item</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /><br />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <button onClick={handleAdd}>Add</button>

      <h3>Current Menu</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - ₹{item.price}
            <button
              onClick={() => handleDelete(item._id)}
              style={{
                marginLeft: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default AdminAdd;
