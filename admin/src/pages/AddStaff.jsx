import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStaff } from '../services/api';

const AddStaff = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [staff, setStaff] = useState({
    name: '',
    nic: '',
    role: 'Manager',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    address: { 
      houseNo: '',
      street: '', 
      city: '' 
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setStaff({
        ...staff,
        [parent]: { ...staff[parent], [child]: value }
      });
    } else {
      setStaff({ ...staff, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (staff.password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await addStaff(staff);
      setLoading(false);
      navigate('/staff');
    } catch (error) {
      setLoading(false);
      console.error('Error adding staff:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add New Staff</h1>
            <p className="text-blue-100 mt-1">Enter staff information below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Personal Information</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={staff.name} 
                  onChange={handleChange} 
                  placeholder="Enter full name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">NIC</label>
                <input 
                  type="text" 
                  name="nic" 
                  value={staff.nic} 
                  onChange={handleChange} 
                  placeholder="National ID number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              {/* Account Information */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Account Information</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={staff.username} 
                  onChange={handleChange} 
                  placeholder="Create username" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select 
                  name="role" 
                  value={staff.role} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required
                >
                  <option value="Manager">Manager</option>
                  <option value="Clerk">Clerk</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={staff.email} 
                  onChange={handleChange} 
                  placeholder="Email address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  value={staff.phoneNumber} 
                  onChange={handleChange} 
                  placeholder="Phone number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={staff.password} 
                  onChange={(e) => {
                    handleChange(e);
                    setPasswordError('');
                  }}
                  placeholder="Create password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Confirm password" 
                  className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  required 
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
              </div>
              
              {/* Address Information */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Address</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">House No</label>
                <input 
                  type="text" 
                  name="address.houseNo" 
                  value={staff.address.houseNo || ''} 
                  onChange={handleChange} 
                  placeholder="House/Apt Number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input 
                  type="text" 
                  name="address.street" 
                  value={staff.address.street} 
                  onChange={handleChange} 
                  placeholder="Street address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input 
                  type="text" 
                  name="address.city" 
                  value={staff.address.city} 
                  onChange={handleChange} 
                  placeholder="City" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                type="submit" 
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Add Staff Member'}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/staff')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Cancel and return to staff list
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;