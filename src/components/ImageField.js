import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { motion } from "framer-motion";
import PhotoPanel from "./photoPanel";

import { selectModeToggle } from "../store/reducers/photoReducer";
import { DeleteFiles } from "../store/reducers/modalReducer.js";

const ImageField = () => {
  const dispatch = useDispatch();

  useFirestoreConnect([
    {
      collection: "images",
      orderBy: ["createdAt", "desc"],
    },
  ]);
  const docs = useSelector((state) => state.firestore.ordered.images);
  const selectMode = useSelector((state) => state.photoSelect.selectMode);
  const selectphotos = useSelector((state) => state.photoSelect.selection);

  const total_size = docs && docs.reduce((acc, cur) => acc + cur.size, 0);

  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex justify-start max-w-2xl mx-auto px-2 space-x-3">
        <p
          className={`px-3 py-1 rounded-xl text-white tracking-wide text-xs select-none cursor-pointer transition-colors
          ${selectMode ? "bg-orange-300" : "bg-blue-300"}`}
          onClick={() => {
            dispatch(selectModeToggle());
          }}
        >
          {selectMode ? "select" : "view"}
        </p>
        <p className="px-3 py-1 rounded-xl bg-blue-200 hover:bg-blue-300 text-white tracking-wide text-xs select-none  transition-colors">
          {total_size ? (total_size / 1000000).toFixed(1) : 0} MB
        </p>
        {Object.keys(selectphotos).length > 0 && selectMode && (
          <p
            className="px-3 py-1 rounded-xl bg-red-200 hover:bg-red-300 text-white tracking-wide text-xs select-none cursor-pointer  transition-colors"
            onDoubleClick={() => dispatch(DeleteFiles(Object.values(selectphotos)))}
          >
            delete files
          </p>
        )}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4">
        {docs &&
          docs.map((doc) => {
            return (
              <motion.div layout whileHover={{ opacity: 1 }} key={doc.id} className="opacity-80">
                <PhotoPanel doc={doc} />
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};

export default ImageField;
