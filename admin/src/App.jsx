// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import StaffList from './pages/StaffList';
import AddStaff from './pages/AddStaff';
import EditStaff from './pages/EditStaff';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="py-6">
          <Routes>
            {/* User Routes */}
            <Route path="/user" element={<UserList />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            
            {/* Staff Routes */}
            <Route path="/staff" element={<StaffList />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/edit-staff/:id" element={<EditStaff />} />
            
            {/* Default Route */}
            <Route path="/" element={<UserList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;