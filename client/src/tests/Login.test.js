import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import { store } from "../app/store";
import Login from "../Pages/Login";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

test("renders login component without errors", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  const loginHeader = screen.getByText(/sign in/i);
  expect(loginHeader).toBeInTheDocument();
});

test("registers user on successful Google OAuth login", () => {
  const history = createMemoryHistory();
  const pushSpy = jest.spyOn(history, "push");
  const mockJwtDecode = jest.fn().mockReturnValue({
    email: "test@test.com",
    given_name: "Test",
    family_name: "User",
    picture: "test.jpg",
  });
  jest.mock("jwt-decode", () => mockJwtDecode);

  const { getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  waitFor(() => {
    const googleLoginButton = getByTestId("googleLogin");
    fireEvent.click(googleLoginButton);

    expect(mockJwtDecode).toHaveBeenCalledWith("mockCredential");
    expect(registerSpy).toHaveBeenCalledWith({
      email: "test@test.com",
      firstName: "Test",
      lastName: "User",
      picture: "test.jpg",
    });
    expect(pushSpy).toHaveBeenCalledWith("/kursuebersicht");
  });
});

test("displays error message on failed registration", () => {
  const mockErrorMessage = "Test error message";
  const mockIsError = true;
  const mockMessage = mockErrorMessage;

  jest.mock("react-redux", () => ({
    useSelector: jest.fn().mockReturnValue({
      account: null,
      isError: mockIsError,
      isSuccess: false,
      message: mockMessage,
    }),
    useDispatch: jest.fn().mockReturnValue(jest.fn()),
  }));

  const mockToastError = jest.fn();

  jest.mock("react-toastify", () => ({
    toast: {
      error: mockToastError,
    },
  }));

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  waitFor(() => expect(mockToastError).toHaveBeenCalledWith(mockErrorMessage));
});

test("lock out line icon shown perfectly", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const lockOutIcon = screen.getByTestId("lockOutIcon");
  expect(lockOutIcon).toBeInTheDocument();
});
