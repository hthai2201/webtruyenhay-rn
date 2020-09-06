import { userApi, handleResponse, baseParams } from '../../utils/apiConfig';

export const getAllStories = (options = {}) => {
  return userApi.get('stories/', { ...baseParams, ...options }).then(handleResponse);
};
export default {
  getAllStories,
};
