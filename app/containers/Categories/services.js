import { userApi, handleResponse, baseParams } from '../../utils/apiConfig';

export const getAllCategories = (options = {}) => {
  return userApi.get('categories/', { ...baseParams, ...options }).then(handleResponse);
};
export default {
  getAllCategories,
};
