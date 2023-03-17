import http from './http';

/* Actions */

const createAccessToken = (data, headers) => http.post('/access-tokens', data, headers);
const createAccessTokenG = (data, headers) => http.post('/verify-google', data, headers);
const verifyUser = (data, headers) => http.post('/verify-user', data, headers);
export default {
  createAccessToken,
  createAccessTokenG,
  verifyUser,
}; 
