import React from "react";
import StudentStandard from "./Templates/StudentStandard"
import StudentWelcome from "./Templates/StudentWelcomeTemplate"

const templates = {
  Welcome: <StudentWelcome/>,
  Standard: <StudentStandard />,
  End: <div>End</div>
};


export default templates;

