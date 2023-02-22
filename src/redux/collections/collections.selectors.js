const getCollectionEntities = () => (state) => state.collections.collectionEntities;
const getCurrentCollection = () => (state) => state.collections.currentCollection;

export { getCollectionEntities, getCurrentCollection };
