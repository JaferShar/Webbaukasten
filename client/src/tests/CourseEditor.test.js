import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../app/store";
import CourseEditor from "../Pages/CourseEditor";

describe("CourseEditor", () => {
  test("renders the course editor page", async () => {
    const originalWarn = console.warn;

    const useSelectorMock = jest.fn();
    useSelectorMock.mockReturnValue({ account: null });

    console.warn = (...args) => {
      if (args[0].includes("An update to ScreenViewer inside a test")) {
        return null;
      }
      act(() => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <CourseEditor />
            </MemoryRouter>
          </Provider>
        );
      });
      const HeaderEditor = screen.getByTestId("HeaderEditor");
      const Screen = screen.getByTestId("screen");
      const ScreenViewer = screen.getByTestId("screen-viewer");
      const Menu = screen.getByTestId("screen-menu");

      waitFor(() => {
        expect(HeaderEditor).toBeInTheDocument();
        expect(Screen).toBeInTheDocument();
        expect(ScreenViewer).toBeInTheDocument();
        expect(Menu).toBeInTheDocument();
      });
      return originalWarn.apply(console, args);
    };
    console.warn = originalWarn;
  });

  test("redirects to login page if user is not logged in", async () => {
    const mockNavigate = jest.fn();
    const useSelectorMock = jest.fn();
    useSelectorMock.mockReturnValue({ account: null });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/course-editor"]}>
            <CourseEditor />
          </MemoryRouter>
        </Provider>
      );
    });

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
  });
});

