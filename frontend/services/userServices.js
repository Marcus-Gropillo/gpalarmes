import axios from 'axios';

const API_URL = 'http://192.168.1.13:3000/api/users';


export const createUser  = async (name) => {
  const response = await axios.post(API_URL, { name });
  return response.data;
};


export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateUser  = async (id, name) => {
  const response = await axios.put(`${API_URL}/${id}`, { name });
  return response.data;
};

export const deleteUser  = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};