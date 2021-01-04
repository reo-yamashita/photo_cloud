import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

const Progressbar = ({ file, setFile }) => {
  const { src, progress, error } = useStorage(file);
  console.log(error && `${error}`);

  useEffect(() => {
    if (src) {
      setFile(null);
    }
  }, [src, setFile]);

  return <div className="h-2 bg-orange-200" style={{ width: progress + "%" }}></div>;
};

export default Progressbar;
