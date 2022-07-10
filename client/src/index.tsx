import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouteSwitch } from "./RouteSwitch";
import { GlobalCryptoProvider } from "./context/GlobalCryptoContext";
import { Provider } from "react-redux";
import { store } from "./features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <GlobalCryptoProvider>
      <RouteSwitch />
    </GlobalCryptoProvider>
  </Provider>
);
