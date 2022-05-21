import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./routes/LandingPage";
import { ProtectedRoute, OpenRoute } from "./components/UserRouting";
import { useAuthentication } from "./hooks/useAuthentication";
import { Home } from "./routes/Home";
import { UserContext } from "./hooks/useUserContext";

export const RouteSwitch = () => {
  const [user, setUser, token, setToken] = useAuthentication();

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
              <UserContext.Provider value={{ user, setUser, token, setToken }}>
                <Home />
              </UserContext.Provider>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
