import React from "react";
import { useState } from "react";
import ScreenViewer from "../Components/CourseEditorComponents/Containers/ScreenViewer";
import Menu from "../Components/CourseEditorComponents/Containers/MenuContainer";
import HeaderEditor from "../Components/HeaderEditor";
import Screen from "../Components/CourseEditorComponents/Screen/Screen";

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
