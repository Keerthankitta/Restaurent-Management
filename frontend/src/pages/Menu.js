// src/pages/Menu.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import './Menu.css'; // ✅ Import the CSS

const Menu = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/menu').then(res => setItems(res.data));
  }, []);

  const handleOrder = (item) => {
    alert(`You ordered: ${item.name} for ₹${item.price}`);
    // 🔁 Optional: Send to API or add to cart later
  };

  return (
    <div className="menu-bg">
      <div className="menu-container">
        <h2>Menu</h2>
        <ul className="menu-list">
          {items.map((item) => (
            <li key={item._id} className="menu-item">
              <span>{item.name} - ₹{item.price}</span>
              <button className="order-button" onClick={() => handleOrder(item)}>
                Order
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
