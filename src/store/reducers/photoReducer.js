export const selectModeToggle = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SLECT_MODE",
    });
  };
};

export const selectFlagToggle = (doc, selected) => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    let collect = {
      ...getState().photoSelect.selection,
      [doc.id]: { ...doc, selected },
    };

    console.log("reo");
    firestore
      .collection("images")
      .doc(doc.id)
      .update({
        ...doc,
        selected,
      })
      .then(() => {
        dispatch({
          type: "SELECT_PHOTO",
          selection: { ...Object.filter(collect, (parcel) => parcel.selected) },
        });
        console.log("Select toggled");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const selectALLFlagToggle = (docs, selected) => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();

    docs.forEach((doc) => {
      if (doc.selected) {
        firestore
          .collection("images")
          .doc(doc.id)
          .update({
            ...doc,
            selected,
          })
          .then(() => {
            dispatch({
              type: "SELECT_PHOTO",
              selection: {
                ...Object.filter(
                  {
                    ...getState().photoSelect.selection,
                    [doc.id]: { ...doc, selected },
                  },
                  (parcel) => parcel.selected
                ),
              },
            });
            console.log("Select toggled");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};

const initState = {
  selectMode: false,
  selection: {},
};

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {});

const photoReducer = (state = initState, action) => {
  switch (action.type) {
    case "SLECT_MODE":
      console.log("Select Mode");
      return {
        ...state,
        selectMode: !state.selectMode,
      };
    case "SELECT_PHOTO":
      console.log("Select Photo");

      return {
        ...state,
        selection: action.selection,
      };
    case "SELECT_INITIAL":
      console.log("Selection Initialized");
      return {
        ...state,
        selectMode: false,
        selection: {},
      };
    default:
      return state;
  }
};

export default photoReducer;
