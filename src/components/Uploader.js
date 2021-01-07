import React, { useState, useRef } from "react";
import ProgressBar from "./ProgressBar";
import AddIcon from "@material-ui/icons/Add";

const Uploader = () => {
  const inputFile = useRef(null);

  const ExploreHandler = () => {
    inputFile.current.click();
  };

  const [file, setFile] = useState(null);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Image Type invalid");
    }
  };

  return (
    <section>
      <div className="h-2 w-full bg-orange-50">
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
      <div className="max-w-2xl mx-auto px-4 flex justify-center items-center">
        <input style={{ display: "none" }} ref={inputFile} onChange={changeHandler} type="file" />
        <div className="rounded-lg px-3 py-1 my-3 text-sm flex justify-center">
          <AddIcon
            className="cursor-pointer rounded-full border p-1 hover:bg-blue-100 hover:text-white transition-colors border-blue-100 text-blue-200"
            onClick={ExploreHandler}
            fontSize="large"
          />
        </div>
      </div>
    </section>
  );
};

export default Uploader;
