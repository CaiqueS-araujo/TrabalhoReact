import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserLoginContextProvider } from './context/UserLoginContext.jsx'
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <UserLoginContextProvider>
    <App />
    </UserLoginContextProvider>
  </StrictMode>,
);
