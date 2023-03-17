import http from './http';

/* Actions */

const registerUser = (data, headers) => http.post('/register', data, headers);

export default {
  registerUser,
};
