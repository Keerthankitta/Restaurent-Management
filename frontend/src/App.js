// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AddMenu from './pages/AddMenu'; // ✅ AddMenu component
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Admin dashboard route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <Admin />
            </PrivateRoute>
          }
        />

        {/* ✅ Add Menu route */}
        <Route
          path="/admin/add"
          element={
            <PrivateRoute role="admin">
              <AddMenu />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
