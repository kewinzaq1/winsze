import { screen } from "@testing-library/react";
import { Navbar } from "../../components/Layout/Navbar";
import { Footer } from "../../components/Layout/Footer";
import { renderLayout } from "../../Utils/tests";

test("render navbar", async () => {
  renderLayout({ ui: <Navbar /> });
  expect(screen.getByRole("heading")).toHaveTextContent("winsze");
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});

test("render footer", async () => {
  renderLayout({ ui: <Footer />, user: { name: "FAKE_USER" } });

  expect(screen.getByRole("button", { name: /friends/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /feed/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
});
