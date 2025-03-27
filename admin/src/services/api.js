import axios from 'axios';

const API_URL = 'http://localhost:8090'; // Adjust based on your backend URL

export const addStaff = (staff) => axios.post(`${API_URL}/staff/add-staff`, staff);
export const getAllStaff = () => axios.get(`${API_URL}/staff/get-staff`);
export const deleteStaff = (id) => axios.delete(`${API_URL}/staff/delete-staff/${id}`);
export const searchStaff = (search) => axios.get(`${API_URL}/staff/search-staff?search=${search}`);
export const getStaffById = (id) => axios.get(`${API_URL}/staff/get-staff/${id}`);
export const updateStaffRole = (id, role) => axios.put(`${API_URL}/staff/update-staff-Role/${id}?Role=${role}`);
export const updateStaffAddress = (id, address) => axios.put(`${API_URL}/staff/update-staff-Address/${id}`, address);
export const updateStaffPhone = (id, phone) => axios.put(`${API_URL}/staff/update-staff-Phone/${id}?phone=${phone}`);
export const updateStaffEmail = (id, email) => axios.put(`${API_URL}/staff/update-staff-Email/${id}?email=${email}`);
export const updateStaffPassword = (id, password) => axios.put(`${API_URL}/staff/update-staff-Password/${id}?password=${password}`);
export const updateStaffName = (id, name) => axios.put(`${API_URL}/staff/update-staff-Name/${id}?name=${name}`);
export const updateStaffNic = (id, nic) => axios.put(`${API_URL}/staff/update-staff-Nic/${id}?nic=${nic}`);

export const addUser = (user) => axios.post(`${API_URL}/user/add-user`, user);
export const getAllUsers = () => axios.get(`${API_URL}/user/all-users`);
export const deleteUser = (id) => axios.delete(`${API_URL}/user/delete-user/${id}`);
export const searchUser = (search) => axios.get(`${API_URL}/user/search-user?search=${search}`);
export const getUserById = (id) => axios.get(`${API_URL}/user/user/${id}`);
export const updateUserName = (id, name) => axios.put(`${API_URL}/user/update-user-name/${id}?name=${name}`);
export const updateUserNic = (id, nic) => axios.put(`${API_URL}/user/update-user-Nic/${id}?nic=${nic}`);
export const updateUserEmail = (id, email) => axios.put(`${API_URL}/user/update-user-email/${id}?email=${email}`);
export const updateUserPhone = (id, phoneNumber) => axios.put(`${API_URL}/user/update-user-phone/${id}?phoneNumber=${phoneNumber}`);
export const updateUserAddress = (id, address) => axios.put(`${API_URL}/user/update-user-address/${id}`, address);
export const updateUserFirstDealDate = (id, date) => axios.put(`${API_URL}/user/update-user-fristdealdate/${id}?fristDealDate=${date}`);
export const updateUserLastDealDate = (id, date) => axios.put(`${API_URL}/user/update-user-lastdealdate/${id}?lastDealDate=${date}`);