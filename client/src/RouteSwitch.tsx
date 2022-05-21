import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./routes/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthentication } from "./hooks/useAuthentication";
import { Home } from "./routes/Home";

export const RouteSwitch: React.FC = () => {
  const [user, token] = useAuthentication();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};
