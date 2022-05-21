import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./routes/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { OpenRoute } from "./components/OpenRoute";
import { useAuthentication } from "./hooks/useAuthentication";
import { Home } from "./routes/Home";

export const RouteSwitch: React.FC = () => {
  const [user, token] = useAuthentication();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute token={token}>
              <LandingPage />
            </OpenRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
