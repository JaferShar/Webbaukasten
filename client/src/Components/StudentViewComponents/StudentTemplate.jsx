import React from "react";
import StudentElementList from "./StudentsElementList.jsx"
import StudentWelcome from "./Templates/StudentWelcomeTemplate"

const templates = {
  Welcome: <StudentWelcome/>,
  Standard: <StudentElementList />,
  End: <div>End</div>
};


export default templates;

