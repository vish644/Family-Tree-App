import React, { useContext } from "react";
import { FamilyContext } from "../context/FamilyContext.jsx";

export const useFamily = () => {
  return useContext(FamilyContext);
};

export default useFamily;
