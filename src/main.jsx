import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserLoginContextProvider } from './context/UserLoginContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserLoginContextProvider>
    <App />
    </UserLoginContextProvider>
  </StrictMode>,
)
