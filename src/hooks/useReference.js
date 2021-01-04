import { useState, useRef, useEffect } from "react";

const useReference = () => {
  const ref = useRef(null);
  const [flag, setFlag] = useState(false);

  const handleClickOutside = (e) => {
    if (ref?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setFlag(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return {
    setFlag,
    flag,
    ref,
  };
};

export default useReference;
