import constants from './constants';
//sync
//async
function searchStories(payload) {
  return { type: constants.SEARCH_STORIES, payload };
}

export const storyActions = {
  //async
  searchStories,
};
