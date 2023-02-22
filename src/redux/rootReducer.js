import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";
import adminReducer from "./admin/admin.reducer";
import collectionsReducer from "./collections/collections.reducer";
import itemsReducer from "./items/items.reducer";

const rootReducer = combineReducers({
  items: itemsReducer,
  admin: adminReducer,
  users: usersReducer,
  collections: collectionsReducer,
});

export default rootReducer;
