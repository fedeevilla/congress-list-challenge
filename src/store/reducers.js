import { combineReducers } from "redux";

import { members } from "./reducers/members";

const rootReducer = combineReducers({
  members,
});

export default rootReducer;
