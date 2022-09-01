import "./styles/index.css";
import ReactDOM from "react-dom/client";
import { RouteSwitch } from "./RouteSwitch";
import { GlobalCryptoProvider } from "./context/GlobalCryptoContext";
import { Provider } from "react-redux";
import { store } from "./features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // Provides access to our redux store to all nested children components.
  <Provider store={store}>
    {/* Context API that manages page overlapping UI components */}
    <GlobalCryptoProvider>
      <RouteSwitch />
    </GlobalCryptoProvider>
  </Provider>
);
