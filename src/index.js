import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import './index.css';
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Configuración dinámica del basename para soportar tanto la raíz como el subdirectorio */}
      <BrowserRouter
        basename={
          window.location.pathname.startsWith("/Modulo34_EBAC_tercera-practica")
            ? "/Modulo34_EBAC_tercera-practica"
            : "/"
        }
      >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
