import React from "react";
import AddIcon from "@material-ui/icons/Add";

//import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
//import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//import { selectModeToggle } from "../store/reducers/photoReducer";
import { signOut } from "../store/reducers/authReducer";
import useReference from "../hooks/useReference";

import { useDispatch } from "react-redux";

const ToolTips = () => {
  const dispatch = useDispatch();
  const { ref, setFlag, flag } = useReference();

  return (
    <div className="fixed" style={{ bottom: "5%", right: "10%" }} ref={ref}>
      <div className="relative">
        {flag && (
          <div className="bg-white absolute right-0 bottom-0 p-3  transform -translate-y-12 shadow rounded-lg">
            <ul className="space-y-2">
              {/* <div
                className="flex items-center justify-start cursor-pointer text-orange-300 hover:text-orange-400"
                onClick={() => {
                  dispatch(selectModeToggle());
                  setFlag(false);
                }}
              >
                <PhotoLibraryIcon className="mr-2" fontSize="small" />
                <p className="opacity-90">Select</p>
              </div>
              <div className="flex items-center justify-start cursor-pointer text-lightBlue-300 hover:text-lightBlue-400">
                <SettingsIcon className="mr-2" fontSize="small" />
                <p>Setting</p>
              </div> */}
              <div
                className="flex items-center justify-start cursor-pointer text-red-300 hover:text-red-400 select-none"
                onDoubleClick={() => dispatch(signOut())}
              >
                <ExitToAppIcon fontSize="small" className="mr-2" />
                <p>logout</p>
              </div>
            </ul>
          </div>
        )}
        <div
          className={`rounded-full p-2 bg-blue-200 cursor-pointer shadow-sm  ${
            flag ? "animate-pulse" : ""
          }`}
          onClick={() => setFlag(!flag)}
        >
          <AddIcon className={`text-white`} />
        </div>
      </div>
    </div>
  );
};

export default ToolTips;
