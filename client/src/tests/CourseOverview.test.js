import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import CourseOverview from "../Pages/CourseOverview";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const courses = [
  { _id: "1", courseName: "Mathematics" },
  { _id: "2", courseName: "Science" },
  { _id: "3", courseName: "History" },
];

describe("CourseEditor", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: { account: { email: "test@test.com" } },
      courseOverview: { coursesState: courses, isError: false, message: "" },
      courseEditor: { course: {}, screen: {} },
    });
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseOverview />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  test("renders the course overview page", () => {
    const courseOverview = screen.getByText("Kursübersicht");
    expect(courseOverview).toBeInTheDocument();
  });

  test("displays a list of courses", () => {
    const courseListItems = screen.getAllByTestId("listitem");
    expect(courseListItems.length).toBe(courses.length);

    courses.forEach((course, index) => {
      expect(screen.getByText(course.courseName)).toBeInTheDocument();
    });
  });

  test("searches for a course by name", async () => {
    const searchTerm = "math";
    const searchInput = screen.getByTestId("searchbar");
    userEvent.type(searchInput, searchTerm);

    const courseListItems = await screen.getAllByTestId("listitem");
    expect(courseListItems.length).toBe(3);
    expect(screen.getByText(courses[0].courseName)).toBeInTheDocument();
  });

  test("creates a new course", async () => {
    const createCourseButton = screen.getByText("Kurs erstellen");
    fireEvent.click(createCourseButton);

    const newCourseNameInput = screen.getByTestId("textarea");
    const saveButton = screen.getByTestId("save-button");
    const newCourseName = "Kurs erstellen";

    userEvent.type(newCourseNameInput, newCourseName);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(newCourseName)).toBeInTheDocument();
    });
  });

  test("deletes a course", async () => {
    const deleteButton = screen.getAllByTestId("more-vert-icon-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(courses[0].courseName)).toBeInTheDocument();
    });
  });
});
