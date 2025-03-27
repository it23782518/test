import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getUserById, 
  updateUserName, 
  updateUserNic, 
  updateUserEmail, 
  updateUserPhone, 
  updateUserAddress, 
  updateUserFirstDealDate, 
  updateUserLastDealDate 
} from '../services/api';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    nic: '',
    email: '',
    phoneNumber: '',
    address: { houseNo: '', street: '', city: '' },
    firstDateDeal: '',
    lastDateDeal: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUserById(id);
      // Ensure address exists to prevent null pointer exceptions
      setUser({
        ...response.data,
        address: response.data.address || { houseNo: '', street: '', city: '' }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user details. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setUser({
        ...user,
        address: { ...user.address, [addressField]: value },
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      
      await Promise.all([
        updateUserName(id, user.name),
        updateUserNic(id, user.nic),
        updateUserEmail(id, user.email),
        updateUserPhone(id, user.phoneNumber),
        updateUserAddress(id, user.address),
        user.firstDateDeal && updateUserFirstDealDate(id, user.firstDateDeal),
        user.lastDateDeal && updateUserLastDealDate(id, user.lastDateDeal),
      ]);
      
      setSubmitting(false);
      navigate('/user');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Edit User</h1>
            <p className="text-blue-100 mt-1">Update user information</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 border-l-4 border-red-500">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Personal Information</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={user.name || ''} 
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
                  value={user.nic || ''} 
                  onChange={handleChange} 
                  placeholder="National ID number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={user.email || ''} 
                  onChange={handleChange} 
                  placeholder="Email address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  value={user.phoneNumber || ''} 
                  onChange={handleChange} 
                  placeholder="Phone number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Address Information</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">House No</label>
                <input 
                  type="text" 
                  name="address.houseNo" 
                  value={user.address?.houseNo || ''} 
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
                  value={user.address?.street || ''} 
                  onChange={handleChange} 
                  placeholder="Street address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input 
                  type="text" 
                  name="address.city" 
                  value={user.address?.city || ''} 
                  onChange={handleChange} 
                  placeholder="City" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-4">Deal Information</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First Deal Date</label>
                <input 
                  type="date" 
                  name="firstDateDeal" 
                  value={user.firstDateDeal || ''} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Last Deal Date</label>
                <input 
                  type="date" 
                  name="lastDateDeal" 
                  value={user.lastDateDeal || ''} 
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button 
                type="submit" 
                disabled={submitting}
                className={`flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update User'
                )}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/user')}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;