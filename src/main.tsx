import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Lobby from "./pages/Lobby/Lobby";
import Menu from "./pages/Menu/Menu";
import Shelter from "./pages/Shelter/Shelter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/shelter",
    element: <Shelter />,
  },
]);

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
