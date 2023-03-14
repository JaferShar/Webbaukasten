import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import StudentView from "../Pages/StudentView";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe("StudentView", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      studentCourse: { course: { screens: [1, 2, 3] } },
      studentScreen: { screen: { template: "Template1" } },
    });
  });

  test("studentView component should render", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <StudentView text="studentView" />
        </MemoryRouter>
      </Provider>
    );

    const studentText = screen.getByTestId("studentView");
    expect(studentText).toBeInTheDocument();
  });

  test("renders progress bar if there are screens", () => {
    render(
      <Provider store={store}>
        <StudentView />
      </Provider>
    );
    expect(screen.getByTestId("progressBar")).toBeInTheDocument();
  });

  test("renders end card if there are no more screens", () => {
    store = mockStore({
      studentCourse: { course: { screens: [1, 2, 3] } },
      studentScreen: { screen: { template: "Template1" } },
    });

    act(() => {
      render(
        <Provider store={store}>
          <StudentView />
        </Provider>
      );
    });

    act(() => {
      fireEvent.click(screen.getByText("Weiter"));
      fireEvent.click(screen.getByText("Weiter"));
      fireEvent.click(screen.getByText("Weiter"));
    });

    waitFor(() => expect(screen.getByTestId("endCard")).toBeInTheDocument());
  });
});
