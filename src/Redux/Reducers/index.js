import { combineReducers } from "redux";
import { ConnectivityReducer } from "./ConnectivityReducers";
import { FormReducers } from "./FormReducers";
export const rootReducer = combineReducers({
  ConnectivityReducer,
  FormReducers,
});
