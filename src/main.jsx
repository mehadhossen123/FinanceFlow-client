import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import route from './Routes/Route'
import { RouterProvider } from 'react-router'
import AuthProvider from './Auth/AuthProvider'
import { ToastContainer } from 'react-toastify'



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={route}></RouterProvider>
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </StrictMode>
);
