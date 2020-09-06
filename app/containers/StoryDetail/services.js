import { userApi, handleResponse, baseParams } from '../../utils/apiConfig';

export const getStory = (options = {}) => {
  return userApi.get(`stories/${options.slug}`, { ...baseParams, ...options }).then(handleResponse);
};
export default {
  getStory,
};
