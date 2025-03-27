import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStaffById, updateStaffRole, updateStaffAddress, updateStaffPhone, updateStaffEmail, updateStaffPassword, updateStaffName, updateStaffNic } from '../services/api';

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({ success: false, message: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Available role options
  const roleOptions = ["Manager", "Clerk", "Delivery"];

  useEffect(() => {
    fetchStaff();
  }, [id]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await getStaffById(id);
      setStaff(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setLoading(false);
    }
  };

  const handleUpdate = async (field, value) => {
    try {
      setLoading(true);
      setUpdateStatus({ success: false, message: '' });
      
      switch (field) {
        case 'name':
          await updateStaffName(id, value);
          break;
        case 'nic':
          await updateStaffNic(id, value);
          break;
        case 'role':
          await updateStaffRole(id, value);
          break;
        case 'address':
          // Include all address fields from the model
          const addressToUpdate = {
            houseNo: value.houseNo || '',
            street: value.street || '',
            city: value.city || ''
          };
          await updateStaffAddress(id, addressToUpdate);
          break;
        case 'phone':
          // Phone could be stored as 'phone' or 'phoneNumber'
          await updateStaffPhone(id, value);
          break;
        case 'email':
          await updateStaffEmail(id, value);
          break;
        case 'password':
          if (staff.password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            setLoading(false);
            return;
          }
          await updateStaffPassword(id, value);
          setConfirmPassword('');
          setPasswordError('');
          break;
        default:
          break;
      }
      
      setUpdateStatus({ 
        success: true, 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully` 
      });
      fetchStaff();
      setLoading(false);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setUpdateStatus({ 
        success: false, 
        message: `Failed to update ${field}. Please try again.` 
      });
      setLoading(false);
    }
  };

  // Handle phone changes properly for either phone or phoneNumber field
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Update both possible field names to ensure compatibility
    setStaff(prevStaff => ({ 
      ...prevStaff, 
      phone: value,
      phoneNumber: value
    }));
  };

  if (!staff && loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!staff) return <div className="text-center p-4">Could not load staff information</div>;

  // Get phone from either field name
  const phoneValue = staff.phoneNumber || staff.phone || '';

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Edit Staff</h1>
            <p className="text-blue-100">Update staff information</p>
          </div>
          
          {updateStatus.message && (
            <div className={`p-4 ${updateStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {updateStatus.message}
            </div>
          )}
          
          <div className="p-6">
            <div className="mb-6 bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h2>
              
              {/* Name Field - Now editable */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="text"
                    value={staff.name || ''}
                    onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                    className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleUpdate('name', staff.name)}
                    disabled={loading}
                    className="w-full sm:w-1/3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Name'}
                  </button>
                </div>
              </div>
              
              {/* NIC Field - Now editable */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NIC</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="text"
                    value={staff.nic || ''}
                    onChange={(e) => setStaff({ ...staff, nic: e.target.value })}
                    className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleUpdate('nic', staff.nic)}
                    disabled={loading}
                    className="w-full sm:w-1/3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update NIC'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Role Field - Dropdown */}
              <div className="bg-gray-50 p-4 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <select
                    value={staff.role || ''}
                    onChange={(e) => setStaff({ ...staff, role: e.target.value })}
                    className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roleOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleUpdate('role', staff.role)}
                    disabled={loading}
                    className="w-full sm:w-1/3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Role'}
                  </button>
                </div>
              </div>
              
              {/* Phone Field - Updated to handle both phoneNumber and phone fields */}
              <div className="bg-gray-50 p-4 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="tel"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleUpdate('phone', phoneValue)}
                    disabled={loading}
                    className="w-full sm:w-1/3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Phone'}
                  </button>
                </div>
              </div>
              
              {/* Email Field */}
              <div className="bg-gray-50 p-4 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="email"
                    value={staff.email || ''}
                    onChange={(e) => setStaff({ ...staff, email: e.target.value })}
                    className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleUpdate('email', staff.email)}
                    disabled={loading}
                    className="w-full sm:w-1/3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Email'}
                  </button>
                </div>
              </div>
              
              {/* Password Field - Updated to include confirm password */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      onChange={(e) => {
                        setStaff({ ...staff, password: e.target.value });
                        setPasswordError('');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError('');
                      }}
                      className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {passwordError && (
                      <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleUpdate('password', staff.password)}
                    disabled={loading || !staff.password || !confirmPassword}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
              
              {/* Address Fields - Updated to match Address.java model */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h2 className="text-lg font-medium text-gray-700 mb-4">Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House No</label>
                    <input
                      type="text"
                      value={staff.address?.houseNo || ''}
                      onChange={(e) => setStaff({ 
                        ...staff, 
                        address: { ...staff.address, houseNo: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="House/Apt Number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                    <input
                      type="text"
                      value={staff.address?.street || ''}
                      onChange={(e) => setStaff({ 
                        ...staff, 
                        address: { ...staff.address, street: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={staff.address?.city || ''}
                      onChange={(e) => setStaff({ 
                        ...staff, 
                        address: { ...staff.address, city: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City"
                    />
                  </div>
                  
                  <button
                    onClick={() => handleUpdate('address', staff.address)}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Address'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => navigate('/staff')}
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStaff;