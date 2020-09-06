import { userApi, handleResponse, baseParams } from '../../utils/apiConfig';

export const searchStories = (options = {}) => {
  return userApi.get('stories/', { ...baseParams, ...options }).then(handleResponse);
};
export default {
  searchStories,
};
