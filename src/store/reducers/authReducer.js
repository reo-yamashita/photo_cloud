export const signIn = (user) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .login({
        email: user.email,
        password: user.password,
      })
      .then(() => {
        dispatch({ type: "SIGNIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNIN_ERROR" });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .logout()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNOUT_ERROR" });
      });
  };
};

const initState = {
  authErr: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      console.log("SignIn Success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNIN_ERROR":
      console.log("SignIn Error");
      return {
        ...state,
        authError: "SignIn failed",
      };
    case "SIGNOUT_SUCCESS":
      console.log("Signout Success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_ERROR":
      console.log("Signout Error");
      return {
        ...state,
        authError: "SignOut failed",
      };
    default:
      return state;
  }
};

export default authReducer;
