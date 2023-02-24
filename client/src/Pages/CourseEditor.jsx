import React from "react";
import { useState } from "react";
import ScreenViewer from "../Components/CourseEditorComponents/Viewer/ScreenViewer";
import Menu from "../Components/CourseEditorComponents/Menu/ScreenMenu";
import HeaderEditor from "../Components/Headers/HeaderEditor";
import Screen from "../Components/CourseEditorComponents/Screen/Screen";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/**
 * This component provides the course editor page.
 *
 * @returns course editor page.
 */
function CourseEditor() {
  const [template, setTemplate] = useState("Welcome");
 const { account } = useSelector((state) => state.auth);
 const navigate = useNavigate();

  const changeTemplate = (template) => {
    setTemplate(template);
  };

  useEffect(() => {
    if (!account) {
      navigate("/login");
      return;
    }
  }, [account, navigate]);

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
