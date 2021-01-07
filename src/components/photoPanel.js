import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle_isSelected } from "../store/reducers/photoReducer";
import { motion } from "framer-motion";

const PhotoPanel = ({ doc }) => {
  const dispatch = useDispatch();

  const selectMode = useSelector((state) => state.photoSelect.selectMode);
  const isSelected = useSelector((state) => {
    let col = state.photoSelect.collection[doc.id];

    return col ? col.isSelected : false;
  });

  const [circle, setCircle] = useState(false);

  const modalHandler = (e) => {
    e.stopPropagation();
    dispatch({ type: "MODAL_OPEN", doc: doc });
  };

  return (
    <div
      className={`relative  overflow-hidden h-0 ${
        isSelected && selectMode ? "border-indigo-400 border-opacity-75" : "border-white"
      }  ${selectMode ? "border-blue-200" : ""} border-4`}
      style={{ padding: "50% 0" }}
      onMouseEnter={() => setCircle(true)}
      onMouseLeave={() => setCircle(false)}
      onClick={() => (selectMode ? dispatch(toggle_isSelected(doc, !isSelected)) : null)}
    >
      <motion.img
        src={doc.src}
        alt={doc.name}
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
