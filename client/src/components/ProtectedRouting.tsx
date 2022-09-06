import { Navigate } from "react-router-dom";
import { useAppSelector } from "../features/";

interface Props {
  token?: String | null;
  children: JSX.Element;
}

export const OnlyUnauthenticated = ({ children }: Props) => {
  const jwtToken = useAppSelector((state) => state.jwtToken.value);

  if (jwtToken) {
    return <Navigate to="/crypto-exchange/home" />;
  }
  return children;
};
