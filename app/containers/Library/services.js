import { userApi, handleResponse, baseParams } from '../../utils/apiConfig';

export const downloadStory = (options) => {
  return userApi.get(`stories/download/${options.slug}`, { ...baseParams }).then(handleResponse);
};
export default {
  downloadStory,
};
