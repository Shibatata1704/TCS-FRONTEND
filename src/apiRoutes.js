// apiRoutes.js

const BACK_URL = 'http://localhost:3000';


export const API_ROUTES = {
  LOGIN: () => `${BACK_URL}/login`, 
  REGISTER: () => `${BASE_URL}/usuarios`,
  GET_USER_BY_EMAIL: (email) => `${BASE_URL}/usuarios?email=${email}`,
  UPDATE_USER: (email) => `${BASE_URL}/usuarios/${email}`,
  DELETE_USER: (email) => `${BASE_URL}/usuarios/${email}`,
};
