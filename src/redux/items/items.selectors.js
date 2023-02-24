const getItemEntities = () => (state) => state.items.itemEntities;
const getCustomFields = () => (state) => state.items.customFields;
const getTags = () => (state) => state.items.tags;
const getCollectionName = () => (state) => state.items.collectionName;
const getCurrentItem = () => (state) => state.items.currentItem;

export { getItemEntities, getCustomFields, getTags, getCollectionName, getCurrentItem };
