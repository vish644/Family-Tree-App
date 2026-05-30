// import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import App from "../src/App";
import "./index.css";
import FamilyContext from "./context/FamilyContext";

createRoot(document.getElementById("root")).render(
  <FamilyContext>
    <App />
  </FamilyContext>,
);
