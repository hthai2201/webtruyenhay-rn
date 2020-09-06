import { userApi, handleResponse, baseParams } from '../../utils/apiConfig';

export const getStoryChapter = (options) => {
  return userApi
    .get(`stories/${options.slug}/chuong-${options.chapterId}`, {
      ...baseParams,
    })
    .then(handleResponse);
};
export default {
  getStoryChapter,
};
