import React from "react";
import ElementList from "../Elements/ElementList";
import WelcomeTemplateEditor from "./WelcomeTemplateEditor";
/** 
 * A component containing templates for creating screens.
 * */
const templates = {
  Welcome: <WelcomeTemplateEditor />,
  Standard: <ElementList />,
};

export default templates;
