import { create } from 'apisauce';
import config from '../config';

export const baseParams = {};
// define the api
export const userApi = create({
  baseURL: config.USER_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const handleResponse = (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
    } else if (response.data && response.data.errors) {
      return Promise.reject(response.data.errors);
    } else {
      const error = 'Đã có lỗi xảy ra, vui lòng thử lại sau';
      return Promise.reject(error);
    }
  } else if (response.data && response.data.errors) {
    return Promise.reject(response.data.errors);
  }

  return response.data;
};
