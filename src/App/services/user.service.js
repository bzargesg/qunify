import config from './config';
import { authHeader } from '../helpers';

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
}
function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  };
  return fetch(`${config.apiURL}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user =>{
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}
function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${config.apiURL}/users`, requestOptions).then(handleResponse);
}
function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiURL}/users/${id}`, requestOptions).then(handleResponse);
}
function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  };
  return fetch(`${config.apiURL}/users/register`, requestOptions).then(handleResponse)
}
function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(),'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  };
  return fetch(`${config.apiURL}/users/${user.id}`, requestOptions).then(handleResponse)
}
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };
  return fetch(`${config.apiURL}/users/${id}`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
  return response.text().then(text =>{
    const data = text && JSON.parse(text);
    if(!response.ok) {
      if(response.status === 401) {
        logout();
        window.location.reload(true)
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}