import constants from './constants';
//sync
function addHistory(payload) {
  return { type: constants.ADD_HISTORY_STORY, payload };
}
function getDownloadChapter(payload) {
  return { type: constants.GET_DOWNLOAD_CHAPTER, payload };
}
//async
function downloadStory(payload) {
  return { type: constants.DOWNLOAD_STORY, payload };
}

export const libraryActions = {
  //sync
  addHistory,
  getDownloadChapter,
  //async
  downloadStory,
};
