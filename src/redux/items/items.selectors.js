const getItemEntities = () => (state) => state.items.itemEntities;
const getCustomFields = () => (state) => state.items.customFields;
const getTags = () => (state) => state.items.tags;
const getCollectionName = () => (state) => state.items.collectionName;
const getCurrentItem = () => (state) => state.items.currentItem;
const getRecentItemsEntities = () => (state) => state.items.recentItems;
const getItemsLoading = () => (state) => state.items.itemsLoading;
const getCanManage = () => (state) => state.items.canManage;
const getSingleItemLoading = () => (state) => state.items.singleItemLoading;
const getSingleItemEntities = () => (state) => state.items.singleItemEntities;
const getItemLikes = () => (state) => state.items.itemLikes;
const getCommentEntities = () => (state) => state.items.commentEntities;
const getCommentAuthor = () => (state) => state.items.commentAuthor;
const getCommentCount = () => (state) => state.items.commentCount;

export {
  getItemEntities,
  getCustomFields,
  getTags,
  getCollectionName,
  getCurrentItem,
  getRecentItemsEntities,
  getItemsLoading,
  getCanManage,
  getSingleItemLoading,
  getSingleItemEntities,
  getItemLikes,
  getCommentEntities,
  getCommentAuthor,
  getCommentCount,
};
