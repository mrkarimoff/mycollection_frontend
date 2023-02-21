import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";
import adminReducer from "./admin/admin.reducer";
import collectionsReducer from "./collections/collections.reducer";

const rootReducer = combineReducers({
  //   auth: authReducer,
  admin: adminReducer,
  users: usersReducer,
  collections: collectionsReducer,
});

export default rootReducer;
