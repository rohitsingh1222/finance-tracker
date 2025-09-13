import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import DeleteConfirm from './pages/DeleteConfirm';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Personal Finance Tracker</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<AddEdit/>} />
          <Route path="/:id/edit" element={<AddEdit/>} />
          <Route path="/:id/delete" element={<DeleteConfirm/>} />
        </Routes>
      </main>
    </div>
  );
}
