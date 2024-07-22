import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import ShowContextProvider from "./hooks/Show.jsx";
import { router } from "./router.jsx";
import store from "./redux/store.js";
import { ToasterProvider } from "./hooks/Toaster.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToasterProvider>
      <ShowContextProvider>
        <Provider store={store}>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </Provider>
      </ShowContextProvider>
    </ToasterProvider>
  </React.StrictMode>
);
