export const DeletePhoto = (file) => {
  // delete one file
  return (dispatch, getState, getFirebase) => {
    const desertRef = getFirebase().storage().ref().child(file.name);
    const firestore = getFirebase().firestore();

    const collectionRef = firestore.collection("images");

    desertRef
      .delete()
      .then(() => {
        collectionRef
          .doc(file.id)
          .delete()
          .then(() => {
            console.log("File Delete");
          })
          .then(() => dispatch({ type: "MODAL_CLOSE" }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
};

export const DeleteFiles = (files) => {
  // delete mutiple files
  return (dispatch, getState, getFirebase) => {
    const fileRef = getFirebase().storage().ref();
    const firestore = getFirebase().firestore();
    const collectionRef = firestore.collection("images");

    files.forEach((file) => {
      const desertRef = fileRef.child(file.name);

      desertRef
        .delete()
        .then(() => {
          collectionRef
            .doc(file.id)
            .delete()
            .then(() => {
              console.log("File Delete");
              dispatch({ type: "SELECT_INITIAL" });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  };
};

const initState = {
  modalToggleStatus: false,
  selected_doc: null,
};

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case "MODAL_OPEN":
      console.log("Modal Open");
      return {
        ...state,
        modalToggleStatus: true,
        selected_doc: action.doc,
      };
    case "MODAL_CLOSE":
      console.log("Modal Closed");
      return {
        ...state,
        modalToggleStatus: false,
        selected_doc: null,
      };
    default:
      return state;
  }
};

export default modalReducer;
