import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";

const rootReducer = combineReducers({
  //   auth: authReducer,
  //   account: accountReducer,
  users: usersReducer,
  //   errors: errorsReducer,
});

export default rootReducer;
