// original expression defined
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {});

export const selectModeToggle = () => {
  return (dispatch) => {
    dispatch({
      type: "SLECT_MODE",
    });
  };
};

export const toggle_isSelected = (doc, isSelected) => {
  return (dispatch, getState) => {
    let collect = {
      ...getState().photoSelect.collection,
      [doc.id]: { ...doc, isSelected },
    };

    dispatch({
      type: "SELECT_PHOTO",
      collection: { ...Object.filter(collect, (parcel) => parcel.isSelected) },
    });
  };
};

export const toggle_ALL_isSelected = (docs, isSelected) => {
  return (dispatch, getState) => {
    let collect = {
      ...getState().photoSelect.collection,
      ...docs.reduce((acc, cur) => ({ ...acc, [cur.id]: { ...cur, isSelected } }), {}),
    };

    dispatch({
      type: "SELECT_PHOTO",
      collection: { ...Object.filter(collect, (parcel) => parcel.isSelected) },
    });
  };
};

const initState = {
  selectMode: false,
  collection: {},
};

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
        collection: action.collection,
      };
    default:
      return state;
  }
};

export default photoReducer;
