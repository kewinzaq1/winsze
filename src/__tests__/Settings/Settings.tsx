import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../../Auth";
import { SettingsProvider } from "../../components/Settings";
import { Settings } from "../../components/Settings";

interface RenderSettings {
  children: JSX.Element;
}

const renderSettings = () => {
  const Wrapper = ({ children }: RenderSettings) => {
    return (
      <AuthProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </AuthProvider>
    );
  };

  return render(<Settings />, { wrapper: Wrapper });
};

test("render settings", () => {
  renderSettings();

  expect(
    screen.getByRole("heading", { name: /settings/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: /personalize account for your preferences/i,
      level: 2,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: /personalize account for your preferences/i,
      level: 2,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/nickname/i, { selector: "span" })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/@undefined/i, { selector: "p" })
  ).toBeInTheDocument();
  // @undefined yes this is ok, because my user doesn't exist

  expect(
    screen.getByText(/profile picture/i, { selector: "span" })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/update profile picture/i, { selector: "p" })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/password/i, { selector: "span" })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/change your password/i, { selector: "p" })
  ).toBeInTheDocument();

  expect(screen.getByText(/email/i, { selector: "span" })).toBeInTheDocument();
  expect(
    screen.getByText(/send verification email/i, { selector: "p" })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/delete account/i, { selector: "span" })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/leave me forever/i, { selector: "p" })
  ).toBeInTheDocument();
});

test("open confirmation modal", () => {
  renderSettings();

  fireEvent.click(screen.getByText(/delete account/i, { selector: "span" }));

  expect(
    screen.getByText(/you want to delete your account/i, { selector: "h2" })
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /this is an irreversible process, all data will be lost and all your subscriptions will be lost/i,
      { selector: "p" }
    )
  ).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
});

test("open form modal", () => {
  renderSettings();

  fireEvent.click(screen.getByText(/profile picture/i, { selector: "span" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();

  fireEvent.click(screen.getByText(/password/i, { selector: "span" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/nickname/i, { selector: "span" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/nickname/i)).toBeInTheDocument();
});
