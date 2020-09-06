import constants from './constants';
//sync
//async
function getAllCategories(payload) {
  return { type: constants.GET_ALL_CATEGORIES, payload };
}

export const categoryActions = {
  //async
  getAllCategories,
};
