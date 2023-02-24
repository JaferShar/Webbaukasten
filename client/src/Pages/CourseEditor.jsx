import React from "react";
import { useState } from "react";
import ScreenViewer from "../Components/CourseEditorComponents/Viewer/ScreenViewer";
import Menu from "../Components/CourseEditorComponents/Menu/ScreenMenu";
import HeaderEditor from "../Components/Headers/HeaderEditor";
import Screen from "../Components/CourseEditorComponents/Screen/Screen";
/**
 * This component provides the course editor page.
 *
 * @returns course editor page.
 */
function CourseEditor() {
  const [template, setTemplate] = useState("Welcome");

  const changeTemplate = (template) => {
    setTemplate(template);
  };

  return (
    <div>
      <HeaderEditor />
      <Screen template={template} />
      <ScreenViewer changeTemplate={changeTemplate} />
      <Menu />
    </div>
  );
}

export default CourseEditor;
