import { Navigate } from "react-router-dom";

interface Props {
  token: String | null;
  children: JSX.Element;
}

export const ProtectedRoute = ({ token, children }: Props) => {
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};
