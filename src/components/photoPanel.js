import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoto } from "../store/reducers/photoReducer";
import { motion } from "framer-motion";

const PhotoPanel = ({ doc }) => {
  const dispatch = useDispatch();
  const selectMode = useSelector((state) => state.photoSelect.selectMode);

  const [circle, setCircle] = useState(false);
  const [flag, setFlag] = useState(false);

  const isFirstRender = useRef(false);
  useEffect(() => {
    setFlag(false);
    isFirstRender.current = true;
  }, [selectMode]);

  const modalHandler = useCallback(() => dispatch({ type: "MODAL_OPEN", doc: doc }), [
    dispatch,
    doc,
  ]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (selectMode) {
        dispatch(selectPhoto(doc, flag));
      }
    }
  }, [selectMode, flag, dispatch, doc]);

  return (
    <div
      className={`relative  overflow-hidden h-0 ${
        flag && selectMode ? "border-indigo-400 border-opacity-75" : "border-white"
      }  ${selectMode ? "border-blue-200" : ""} border-4`}
      style={{ padding: "50% 0" }}
      onMouseEnter={() => setCircle(true)}
      onMouseLeave={() => setCircle(false)}
      onClick={() => (selectMode ? setFlag(!flag) : null)}
    >
      <motion.img
        src={doc.src}
        alt=""
        className={`object-cover select-none absolute top-0`}
        style={{ minHeight: "100%", minWidth: "100%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
      {circle && (
        <div
          className="absolute top-0 rounded-full m-1 p-1 bg-lightBlue-50 opacity-60  cursor-pointer h-4 w-4 shadow-lg"
          onClick={modalHandler}
        ></div>
      )}
    </div>
  );
};

export default PhotoPanel;
