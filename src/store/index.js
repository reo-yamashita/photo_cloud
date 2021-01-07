import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import rootReducer from "./rootReducer";

const initialState = {};
const composeEnhancers =
  //window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirebase, getFirestore)))
);
