const getCollectionEntities = () => (state) => state.collections.collectionEntities;
const getCurrentCollection = () => (state) => state.collections.currentCollection;
const getBiggestCollectionEntities = () => (state) => state.collections.biggestCollectionEntities;
const getCollectionsLoading = () => (state) => state.collections.collectionsLoading;

export {
  getCollectionEntities,
  getCurrentCollection,
  getBiggestCollectionEntities,
  getCollectionsLoading,
};
