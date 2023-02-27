const getSearchValue = () => (state) => state.search.searchValue;
const getSearchResult = () => (state) => state.search.searchResult;
const getResultsLoading = () => (state) => state.search.resultsLoading;

export { getSearchValue, getSearchResult, getResultsLoading };
