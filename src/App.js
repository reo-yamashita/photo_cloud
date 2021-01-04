import React from "react";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { ClipLoader } from "react-spinners";

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div className="relative">
        <div className="mx-auto max-w-xl py-3">
          <div className="absolute inset-x-0 m-auto mt-12 flex justify-center">
            <ClipLoader size={150} color={"#c3f3fa"} loading={true} />
          </div>
        </div>
      </div>
    );
  return children;
};

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <Router>
      <AuthIsLoaded>
        <div className="min-h-screen">
          <Switch>
            <PrivateRoute path="/" exact>
              <Dashboard />
            </PrivateRoute>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Redirect
              to={{
                pathname: "/signin",
              }}
            />
          </Switch>
        </div>
      </AuthIsLoaded>
    </Router>
  );
}

export default App;
