import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";
import adminReducer from "./admin/admin.reducer";

const rootReducer = combineReducers({
  //   auth: authReducer,
  admin: adminReducer,
  users: usersReducer,
  //   errors: errorsReducer,
});

export default rootReducer;
