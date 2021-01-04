import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./reducers/authReducer";
import modalReducer from "./reducers/modalReducer";
import photoReducer from "./reducers/photoReducer";

const RootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  photoSelect: photoReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default RootReducer;
