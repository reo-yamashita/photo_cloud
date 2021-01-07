import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import Delete from "@material-ui/icons/Delete";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import InfoIcon from "@material-ui/icons/Info";

import { DeletePhoto } from "../store/reducers/modalReducer";
import useReference from "../hooks/useReference";

const Modal = () => {
  const dispatch = useDispatch();

  const modal_doc = useSelector((state) => state.modal.selected_doc);
  const toggle_status = useSelector((state) => state.modal.modalToggleStatus);

  const { ref, setFlag, flag } = useReference();
  const [circle, setCircle] = useState(false);

  const modalCloseHandler = useCallback(() => dispatch({ type: "MODAL_CLOSE" }), [dispatch]);

  useEffect(() => {
    if (toggle_status) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggle_status]);

  return (
    <div className="fixed top-0 w-full h-screen bg-warmGray-800  mx-auto  overflow-y-auto flex flex-col items-center modal_wrapper">
      <div className="w-full pt-3 pb-8 px-4">
        <nav className="mx-auto max-w-3xl flex items-center">
          <div className="flex-1 flex items-end space-x-3 relative">
            <div className="flex items-end">
              <p className="text-lg select-none">{modal_doc.name}</p>
              <div className="cursor-pointer ml-3">
                <InfoIcon
                  onMouseEnter={() => setCircle(true)}
                  onMouseLeave={() => setCircle(false)}
                />
              </div>
              {circle && (
                <div className="absolute z-50 top-8">
                  <div className="px-3 py-2 bg-gray-50 opacity-90 rounded-md text-sm">
                    <p>
                      <span>Size: </span>
                      {(modal_doc.size / 1000).toFixed(1)} KB
                    </p>
                    <p>
                      <span>CreatedAt: </span>
                      {moment(modal_doc.createdAt.toDate()).format("YYYY年 M月 D日 H時 m分")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="max-w-lg mx-auto px-2 flex justify-end items-center space-x-4">
            {/* <GetAppIcon onClick={() => ImgDownloadHnadler()} className="cursor-pointer" /> */}
            <div className="relative" ref={ref}>
              <Delete
                onClick={() => {
                  setFlag(!flag);
                }}
                className="cursor-pointer relative"
              />
              {flag && (
                <div className="absolute z-50 -translate-x-full transform px-2 py-1 bg-white opacity-70 text-sm rounded-md">
                  <button
                    onDoubleClick={() => dispatch(DeletePhoto(modal_doc))}
                    className="focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <HighlightOffIcon className="cursor-pointer" onClick={modalCloseHandler} />
          </div>
        </nav>
      </div>
      <div className="max-w-2xl mx-auto h-auto pt-8 mb-8">
        <img src={modal_doc.src} alt={modal_doc.name} className="object-contain block" />
      </div>
    </div>
  );
};

export default Modal;
