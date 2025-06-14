import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
  import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
      <ToastContainer autoClose={1500}/>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>
);
