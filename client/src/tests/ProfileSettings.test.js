import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../app/store";
import ProfileSetting from "../Pages/ProfileSettings";

describe("ProfileSetting component", () => {
  test("renders user's profile information", () => {
    // Mock the account data
    const mockAccount = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      picture: "https://example.com/profile.jpg",
    };
    jest.mock("react-redux", () => ({
      useSelector: () => ({ account: mockAccount }),
    }));

    // Render the component
    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileSetting />
        </MemoryRouter>
      </Provider>
    );

    // Async task..
    waitFor(() => {
      const altRemySharp = getByAltText("Remy Sharp");
      const firstName = getByText("First Name");
      const lastName = getByText("Last Name");
      const email = getByText("Email");

      // Expect the profile information to be displayed
      expect(altRemySharp).toBeInTheDocument();
      expect(firstName).toBeInTheDocument();
      expect(lastName).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    });
  });

  test("redirects to login page when account is not available", () => {
    // Mock the navigate function
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    // Render the component with no account data
    jest.mock("react-redux", () => ({
      useSelector: () => ({ account: null }),
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileSetting />
        </MemoryRouter>
      </Provider>
    );

    // Expect to be redirected to login page
    waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
  });

  test("checking the avatar is exists inside the component", () => {
    const { getByTestId, container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileSetting />
        </MemoryRouter>
      </Provider>
    );

    waitFor(() => {
      const avatar = getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
    });
  });
});
