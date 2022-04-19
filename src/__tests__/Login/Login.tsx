import { screen, waitFor } from "@testing-library/react";
import { renderLayout } from "../../Utils/tests";
import userEvent from "@testing-library/user-event";
import { Login } from "../../components/Login/Login";

import { Layout } from "../../components/Layout";

const renderLoginScreen = () => {
  renderLayout({
    ui: (
      <Layout>
        <Login />
      </Layout>
    ),
  });

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

const renderRegisterScreen = async () => {
  const { emailInput, passwordInput, registerButton } = renderLoginScreen();
  await userEvent.click(registerButton);
  const usernameInput = screen.getByLabelText(/nickname/i);
  const sendForm = screen.getByRole("button", { name: /register/i });

  return {
    emailInput,
    passwordInput,
    sendForm,
    usernameInput,
  };
};

test("display login page", async () => {
  const { emailInput, passwordInput, loginButton, registerButton } =
    renderLoginScreen();

  await waitFor(() => screen.getByRole("button", { name: /sign up/i }));

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
  expect(screen.getByText("Welcome back")).toBeInTheDocument();
  expect(
    screen.getByText("Nice that you are still with us")
  ).toBeInTheDocument();
});

test("display register page", async () => {
  const { emailInput, passwordInput, sendForm, usernameInput } =
    await renderRegisterScreen();

  await waitFor(() => screen.getByRole("button", { name: /log in/i }));

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(sendForm).toBeInTheDocument();
  expect(screen.getByText("Nice to Meet You")).toBeInTheDocument();
  expect(
    screen.getByText("First time? Create Free Account Now. Its 100% free")
  ).toBeInTheDocument();
});
