import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ImageIcon from "@material-ui/icons/Image";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { selectModeToggle } from "../store/reducers/photoReducer";

import useReference from "../hooks/useReference";

const SelectPhoto = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);

  const { ref, setFlag, flag } = useReference();

  return (
    <ul className=" flex justify-around space-x-4 text-gray-600">
      {auth.uid && (
        <div className="relative" ref={ref}>
          <ImageIcon
            onClick={() => setFlag(!flag)}
            className={`${flag ? "text-orange-300" : "text-lightBlue-200"} cursor-pointer`}
          />
          {flag && (
            <div className="absolute mt-1 rounded-md p-3 shadow-md select-none bg-white z-20">
              <ul className="space-y-2">
                <div
                  className="flex items-center justify-start cursor-pointer hover:text-orange-300"
                  onClick={() => dispatch(selectModeToggle())}
                >
                  <PhotoLibraryIcon className="mr-2 text-orange-200" fontSize="small" />
                  <p className="opacity-90">Select</p>
                </div>
                {/* <div className="flex items-center justify-start cursor-pointer  hover:text-red-300">
                  <ExitToAppIcon
                    fontSize="small"
                    className="mr-1"
                  />
                  <p>logout</p>
                </div> */}
              </ul>
            </div>
          )}
        </div>
      )}
    </ul>
  );
};

export default SelectPhoto;
