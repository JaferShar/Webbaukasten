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
      navigate("/");
      return;
    }
  }, [account, navigate]);

  return (
    <div>
      <div data-testid="HeaderEditor">
        <HeaderEditor />
      </div>
      
      <div data-testid="screen">
        <Screen template={template} />
      </div>

      <div data-testid="screen-viewer">
        <ScreenViewer changeTemplate={changeTemplate} />
      </div>
      
      <div data-testid="screen-menu">
        <Menu />
      </div>
    </div>
  );
}

export default CourseEditor;
