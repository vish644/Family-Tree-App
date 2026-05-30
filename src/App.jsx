import React from "react";
import Searchbar from "./components/Searchbar";
import FamilyForm from "./components/FamilyForm";
import FamilyTree from "./components/FamilyTree";
import MemberDetails from "./components/MemberDetails";

const App = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 justify-center p-10 ">
        <Searchbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 justify-center px-10 ">
        <FamilyForm />

        <FamilyTree />
        <MemberDetails />
      </div>
    </>
  );
};

export default App;
