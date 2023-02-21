import React from "react";
import StudentElementList from "../Elements/StudentsElementList.jsx"
import StudentWelcome from "./StudentWelcomeTemplate"

const templates = {
  Welcome: <StudentWelcome/>,
  Standard: <StudentElementList />,
  End: <div>End</div>
};

export default templates;

