import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const  [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/menu" className="nav-link">Menu</NavLink>
        <NavLink to="/login" className="nav-link">Login</NavLink>
        <NavLink to="/register" className="nav-link">Register</NavLink>
        {user?.role === 'admin' && <NavLink to="/admin" className="nav-link">Admin</NavLink>}
      </div>
      <div className="nav-right">
        <span className="time-display">{currentTime.toLocaleTimeString()}</span>
      </div>
    </nav>
  );
};

export default Navbar;
