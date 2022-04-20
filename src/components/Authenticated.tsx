import React from "react";
import { Route, Routes } from "react-router-dom";
import { Feed } from "./Feed";
import { Progress } from "./Layout";
import { SettingsProvider, Settings } from "./Settings";
import { Friends } from "./Users";

const SingleUser = React.lazy(() => import("./Users/SingleUser"));

export const AuthenticatedApp = () => (
  <Routes>
    <Route
      path="/settings"
      element={
        <SettingsProvider>
          <Settings />
        </SettingsProvider>
      }
    />
    <Route path="/" element={<Feed />}></Route>
    <Route path="/users" element={<Friends />}></Route>
    <Route
      path="/users/:id"
      element={
        <React.Suspense fallback={<Progress />}>
          <SingleUser />
        </React.Suspense>
      }
    ></Route>
  </Routes>
);
