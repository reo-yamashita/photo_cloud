export const selectPhoto = (file, flag) => {
  return (dispatch, getState) => {
    let collect = {
      ...getState().photoSelect.selection,
      [file.id]: { ...file, select: flag },
    };
    dispatch({
      type: "SELECT_PHOTO",
      selection: { ...Object.filter(collect, (parcel) => parcel.select) },
    });
  };
};

export const selectModeToggle = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "SLECT_MODE",
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
      console.log("Photo collection");
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
