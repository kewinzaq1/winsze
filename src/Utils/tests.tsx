import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Auth";
import * as React from "react";

interface RenderLayout {
  ui: JSX.Element;
  user?: unknown;
}

interface Wrapper {
  children: JSX.Element;
}

export const renderLayout = ({ ui, user }: RenderLayout) => {
  const wrapper = ({ children }: Wrapper) => (
    <BrowserRouter>
      <AuthProvider initUser={user}>{children}</AuthProvider>
    </BrowserRouter>
  );

  if (!ui) {
    return null;
  }

  return render(ui, { wrapper });
};
