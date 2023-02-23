import React from "react";
import ElementList from "../Elements/ElementList";
import WelcomeTemplateEditor from "./WelcomeTemplateEditor";

const templates = {
  Welcome: <WelcomeTemplateEditor/>,
  Standard: <ElementList />,
};

export default templates;
