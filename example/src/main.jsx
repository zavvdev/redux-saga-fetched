import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./presentation/app.jsx";
import { Provider } from "react-redux";
import { store } from "./application/store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
