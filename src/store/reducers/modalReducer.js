export const DeletePhoto = (doc) => {
  // delete a file
  return (dispatch, getState, getFirebase) => {
    const storage_Ref = getFirebase().storage().ref().child(doc.name);
    const firestore = getFirebase().firestore();

    const collection_Ref = firestore.collection("images");
    const delete_Storage = storage_Ref.delete();
    const delete_Doc = collection_Ref.doc(doc.id).delete();

    Promise.all([delete_Storage, delete_Doc])
      .then(() => {
        console.log("File Delete");
        dispatch({ type: "MODAL_CLOSE" });
      })
      .catch((err) => console.log(err.message));
  };
};

export const DeletePhotos = (files) => {
  // delete mutiple files
  return (dispatch, getState, getFirebase) => {
    const storage_Ref = getFirebase().storage().ref();
    const firestore = getFirebase().firestore();
    const collection_Ref = firestore.collection("images");

    Promise.all(
      files.map(async (file) => {
        const child_storage_Ref = storage_Ref.child(file.name);
        const delete_Storage = child_storage_Ref.delete();
        const delete_Doc = collection_Ref.doc(file.id).delete();
        await Promise.all([delete_Storage, delete_Doc]);
      })
    )
      .then(() => {
        dispatch({
          type: "SELECT_PHOTO",
          collection: {},
        });
        console.log("All File Deleted");
      })
      .catch((error) => {
        console.error(error.message);
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
