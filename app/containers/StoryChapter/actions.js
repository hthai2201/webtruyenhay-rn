import constants from './constants';
//sync
//async
function getStoryChapter(payload) {
  return { type: constants.GET_STORY_CHAPTER, payload };
}

export const storyChapterActions = {
  //async
  getStoryChapter,
};
