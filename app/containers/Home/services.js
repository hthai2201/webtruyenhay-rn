import { userApi, handleResponse, baseParams } from '../../utils/apiConfig';

export const getALlStories = (options = {}) => {
  return userApi.get('stories/', { ...baseParams, ...options }).then(handleResponse);
};
