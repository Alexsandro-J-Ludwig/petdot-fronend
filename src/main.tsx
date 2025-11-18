import React from 'react';
import './index.css'
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Lobby from './pages/Lobby/Lobby';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby/>
  },
])

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}