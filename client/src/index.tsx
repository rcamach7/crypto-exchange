import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouteSwitch } from "./RouteSwitch";
import { GlobalCryptoProvider } from "./context/GlobalCryptoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalCryptoProvider>
      <RouteSwitch />
    </GlobalCryptoProvider>
  </React.StrictMode>
);
