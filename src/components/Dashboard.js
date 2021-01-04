import React from "react";
import ImageField from "./ImageField";
import Uploader from "./Uploader";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import ToolTips from "./ToolTips";

const Dashboard = () => {
  const modalState = useSelector((state) => state.modal.modalToggleStatus);

  return (
    <>
      <Uploader />
      <ImageField />
      <ToolTips />
      {modalState && <Modal />}
    </>
  );
};

export default Dashboard;
