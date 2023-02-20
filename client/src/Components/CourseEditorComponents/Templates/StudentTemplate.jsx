import React from "react";
import ElementList from "../Elements/ElementList";
import StudentWelcome from "./StudentWelcomeTemplate"

const templates = {
  Welcome: <StudentWelcome/>,
  Standard: <ElementList />,
  End: <div>End</div>
};

export default templates;
