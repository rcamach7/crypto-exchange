import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalCryptoContext";

interface Props {
  token?: String | null;
  children: JSX.Element;
}

export const ProtectedRoute = ({ token, children }: Props) => {
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export const OnlyUnauthenticated = ({ children }: Props) => {
  const { token } = useGlobalContext();

  if (token) {
    return <Navigate to="/home" />;
  }
  return children;
};
