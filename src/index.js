import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./main.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
//import reportWebVitals from './reportWebVitals';

import { store } from "./store";
import { firebase } from "./firebase/config";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

const reduxConfig = {
  firebase,
  config: { attachAuthIsReady: true },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...reduxConfig}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
