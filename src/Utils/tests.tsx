import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Auth";
import React from "react";

interface RenderLayout {
  ui: JSX.Element;
  user?: unknown;
}

interface Wrapper {
  children: JSX.Element;
}

export const render = ({ ui, user }: RenderLayout) => {
  const wrapper = ({ children }: Wrapper) => (
    <BrowserRouter>
      <AuthProvider initUser={user}>{children}</AuthProvider>
    </BrowserRouter>
  );

  if (!ui) {
    return null;
  }

  return rtlRender(ui, { wrapper });
};
