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
};
