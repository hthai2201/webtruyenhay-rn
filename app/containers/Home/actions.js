import constants from './constants';
//sync
//async
function getAllStories(payload) {
  return { type: constants.GET_ALL_STORIES, payload };
}

export const storyActions = {
  //async
  getAllStories,
};
