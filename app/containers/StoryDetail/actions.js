import constants from './constants';
//sync
//async
function getStory(payload) {
  return { type: constants.GET_STORY, payload };
}

export const storyDetailActions = {
  //async
  getStory,
};
