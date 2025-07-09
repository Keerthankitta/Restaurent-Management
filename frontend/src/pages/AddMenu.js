import React, { useState } from 'react';
import API from '../api';

const AddMenu = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = async () => {
    try {
      await API.post('/menu/add', { name, price, description });
      alert('Item added!');
      setName('');
      setPrice('');
      setDescription('');
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Failed to add item.');
    }
  };

  return (
    <div>
      <h2>Add Menu Item</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddMenu;
