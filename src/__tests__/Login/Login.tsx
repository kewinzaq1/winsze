import { screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import { renderLayout } from "../../Utils/tests";

const renderLoginScreen = () => {
  renderLayout({ ui: <App /> });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });
  const registerButton = screen.getByRole("button", { name: /sign up/i });

  return {
    emailInput,
    passwordInput,
    loginButton,
    registerButton,
  };
};

const renderRegisterScreen = () => {
  const { emailInput, passwordInput, registerButton } = renderLoginScreen();
  fireEvent.click(registerButton);
  const usernameInput = screen.getByLabelText(/nickname/i);
  const sendForm = screen.getByRole("button", { name: /register/i });

  return {
    emailInput,
    passwordInput,
    sendForm,
    usernameInput,
  };
};

test("display login page", () => {
  const { emailInput, passwordInput, loginButton, registerButton } =
    renderLoginScreen();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
  expect(screen.getByText("Welcome back")).toBeInTheDocument();
  expect(
    screen.getByText("Nice that you are still with us")
  ).toBeInTheDocument();
});

test("display register page", () => {
  const { emailInput, passwordInput, sendForm, usernameInput } =
    renderRegisterScreen();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(sendForm).toBeInTheDocument();
  expect(screen.getByText("Nice to Meet You")).toBeInTheDocument();
  expect(
    screen.getByText("First time? Create Free Account Now. Its 100% free")
  ).toBeInTheDocument();
});
